import express from "express";
import bodyParser from "body-parser";
import { Client, logger } from "camunda-external-task-client-js";
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
const config = {
  baseUrl: "http://localhost:8080/engine-rest",
  use: logger,
  asyncResponseTimeout: 10000,
};

// create a Client instance with custom configuration
const client = new Client(config);

client.subscribe("register-user", async function ({ task, taskService }) {
  // Execute your logic for the external task here, using the task and taskService objects
  const firstName = task.variables.get("firstName");
  const lastName = task.variables.get("lastName");
  const email = task.variables.get("email");
  const paswwrod = task.variables.get("password");

  const data = {
    id: 200,
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: paswwrod,
    is_admin: false,
  };

  UserController.registerUser(data);

  // Complete the task
  await taskService.complete(task);
});

client.subscribe("assign-to-course", async function ({ task, taskService }) {
  // Execute your logic for the external task here, using the task and taskService objects
  const courseId = task.variables.get("courseId");

  const data = {
    course_id: courseId,
    user_id: 200,
  };

  UserController.assignUserToCourse(data);

  // Complete the task
  await taskService.complete(task);
});

// START SERVER
// app.listen(3000, hostname, () => {
//   console.log(`Server listening`);
// });
