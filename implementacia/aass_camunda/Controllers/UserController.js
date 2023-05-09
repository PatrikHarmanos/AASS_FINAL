import express from "express";
import pkg from "body-parser";
const { json, urlencoded } = pkg;
import cors from "cors";
import Config from "../config.js";
const pool = Config.pool;
const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

const saltRounds = 10;

import { validate } from "email-validator";

import TokenController from "./TokenController.js";
import { parse } from "dotenv";

// REGISTER NEW USER:
// const registerUser = async (request, response) => {
//   const { first_name, last_name, password, email, is_admin } = request.body;
//   if (!first_name) {
//     response.status(400).json({ message: "first_name is required." });
//     return;
//   }
//   if (!last_name) {
//     response.status(400).json({ message: "last_name is required." });
//     return;
//   }
//   if (!password) {
//     response.status(400).json({ message: "password is required." });
//     return;
//   }
//   if (!email) {
//     response.status(400).json({ message: "email is required." });
//     return;
//   }
//   if (!validate(email)) {
//     response.status(400).json({ message: "e-mail has wrong format." });
//     return;
//   }
//   const passwordHash = await hash(password, saltRounds);

//   pool.query(
//     "INSERT INTO users (id, first_name, last_name, password, email, is_admin) VALUES ($1, $2, $3, $4, $5, $6)",
//     [1, first_name, last_name, passwordHash, email, is_admin],
//     (error) => {
//       if (error) {
//         throw error;
//       }
//       response.status(201).json({ message: "User created." });
//     }
//   );
// };

const registerUser = async (request) => {
  const { id, first_name, last_name, password, email, is_admin } = request;
  if (!first_name) {
    console.log("first_name is required.");
    return;
  }
  if (!last_name) {
    console.log("last_name is required.");
    return;
  }
  if (!password) {
    console.log("password is required.");
    return;
  }
  if (!email) {
    console.log("email is required.");
    return;
  }
  if (!validate(email)) {
    console.log("e-mail has wrong format.");
    return;
  }
  const passwordHash = await hash(password, saltRounds);

  pool.query(
    "INSERT INTO users (id, first_name, last_name, password, email, is_admin) VALUES ($1, $2, $3, $4, $5, $6)",
    [id, first_name, last_name, passwordHash, email, is_admin],
    (error) => {
      if (error) {
        throw error;
      }
      console.log("User created.");
    }
  );
};

const assignUserToCourse = async (request) => {
  const { user_id, course_id } = request;

  pool.query(
    "INSERT INTO courses_users (course_id, user_id) VALUES ($1, $2)",
    [course_id, user_id],
    (error) => {
      if (error) {
        throw error;
      }
      console.log(
        `User with id = ${user_id} assigned to course with id = ${course_id}.`
      );
    }
  );
};

// LOGIN USER:
const loginUser = async (request, response) => {
  const { email, password } = request.body;

  if (!password) {
    response.status(400).json({ message: "password is required." });
    return;
  }
  if (!email) {
    response.status(400).json({ message: "email is required." });
    return;
  }
  pool.query(
    "SELECT * FROM users WHERE email LIKE $1",
    [email],
    async (error, results) => {
      if (error) {
        throw error;
      }
      if (!results.rows[0]) {
        response.status(404).json({ message: "User does not exist." });
      }
      const passwordHash = results.rows[0].password;
      if (await compare(password, passwordHash)) {
        const accessToken = TokenController.generateAccessToken({
          email: email,
        });
        const refreshToken = TokenController.generateRefreshToken({
          email: email,
        });
        const first_name = results.rows[0].first_name;
        const last_name = results.rows[0].last_name;
        const user_email = results.rows[0].email;
        const id = results.rows[0].id;
        const is_admin = results.rows[0].is_admin;
        pool.query(
          "UPDATE users SET access_token = $1, refresh_token = $2 WHERE email LIKE $3",
          [accessToken, refreshToken, email],
          async (error, results) => {
            if (error) {
              throw error;
            }
            response.status(200).json({
              accessToken: accessToken,
              refreshToken: refreshToken,
              first_name: first_name,
              last_name: last_name,
              email: user_email,
              id: id,
              is_admin: is_admin,
            });
          }
        );
      } else {
        response.status(401).json({ message: "Incorrect password." });
      }
    }
  );
};

// UPDATE USER -> CHANGE PASSWORD
const updateUser = async (request, response) => {
  const { new_password } = request.body;

  if (!new_password) {
    response.status(400).json({ message: "new_password is required." });
    return;
  }
  // from request header -> token
  const authHeader = request.headers["authorization"];
  // the request header contains the token "Bearer <token>", split the string and use the second value in the split array.
  const access_token = authHeader.split(" ")[1];

  pool.query(
    "SELECT * FROM users WHERE access_token = $1;",
    [String(access_token)],
    async (error, results) => {
      if (!results.rows[0]) {
        response
          .status(404)
          .json({ message: "User with this id does not exist." });
      }
      let id = results.rows[0].id;
      const passwordHash = await hash(new_password, saltRounds);
      pool.query(
        "UPDATE users SET password = $1 WHERE id = $2",
        [passwordHash, id],
        (error, results) => {
          if (error) {
            throw error;
          }
          response
            .status(200)
            .json({ message: "Password updated succesfully." });
        }
      );
    }
  );
};

// LOGOUT USER
const logoutUser = (request, response) => {
  const { refreshToken } = request.body;
  refreshTokens = TokenController.refreshTokens.filter(
    (c) => c != refreshToken
  );
  //remove the old refreshToken from the refreshTokens list
  response.status(204).json({ message: "Successfully logout." });
};

const test = () => {
  console.log("TEST");
};

export default {
  registerUser,
  loginUser,
  updateUser,
  logoutUser,
  test,
  assignUserToCourse,
};
