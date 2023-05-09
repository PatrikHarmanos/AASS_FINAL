import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

// // IMPORT CONTROLLERS
import UserController from "./Controllers/UserController.js";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// SET PORT
const hostname = "localhost";

// ACCOUNTS
app.route("/api/account/register").post(UserController.registerUser);

// START SERVER
app.listen(3000, hostname, () => {
  console.log(`Server listening`);
});
