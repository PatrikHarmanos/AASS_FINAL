import express from "express";
import pkg from "body-parser";
const { json, urlencoded } = pkg;
import cors from "cors";

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

import pkg1 from "jsonwebtoken";
const { sign, verify } = pkg1;

// ARRAY FOR STORING REFSRESH TOKENS
let refreshTokens = [];

// GENERATE ACCESS TOKEN
const generateAccessToken = (email) => {
  return sign(email, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "60m" });
};

// GENERATE REFRESH TOKEN
const generateRefreshToken = (email) => {
  const refreshToken = sign(email, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "60m",
  });
  refreshTokens.push(refreshToken);
  return refreshToken;
};

// REFRESH TOKEN UPDATE
const refreshTokenUpdate = (request, response) => {
  const { email, refreshToken } = request.body;
  if (!email) {
    response.status(400).json({ message: "email is required." });
    return;
  }
  if (!refreshToken) {
    response.status(400).json({ message: "refreshToken is required." });
    return;
  }
  if (!refreshTokens.includes(refreshToken)) {
    response.status(400).json({ message: "Refresh Token Invalid" });
    return;
  }
  //remove the old refreshToken from the refreshTokens list
  refreshTokens = refreshTokens.filter((c) => c != refreshToken);

  //generate new accessToken and refreshTokens
  const newAccessToken = generateAccessToken({ email: email });
  const newRefreshToken = generateRefreshToken({ email: email });

  response
    .status(200)
    .json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
};

// VALIDATE TOKEN
const validateToken = (request, response, next) => {
  //get token from request header
  const authHeader = request.headers["authorization"];
  //the request header contains the token "Bearer <token>", split the string and use the second value in the split array.
  const token = authHeader.split(" ")[1];
  if (token == null)
    response.sendStatus(400).json({ message: "Token not present" });
  verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      response.status(403).json({ message: "Token invalid" });
    } else {
      request.user = user;
      //proceed to the next action in the calling function
      next();
    }
  });
};

export default {
  generateAccessToken,
  generateRefreshToken,
  refreshTokens,
  refreshTokenUpdate,
  validateToken,
};
