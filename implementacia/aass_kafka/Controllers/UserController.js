import express from "express";
import pkg from "body-parser";
const { json, urlencoded } = pkg;
import cors from "cors";
import Config from "../config.js";
import { Kafka } from "kafkajs";

const pool = Config.pool;
const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

import { hash, compare } from "bcrypt";

const saltRounds = 10;

import { validate } from "email-validator";

const kafka = new Kafka({
  clientId: "kafka-nodejs-starter",
  brokers: ["localhost:9092"],
});

const registrationServiceProducer = kafka.producer();
const courseServiceProducer = kafka.producer();

const courseServiceConsumer = kafka.consumer({
  groupId: "demoTopic-consumerGroup",
});
const emailServiceConsumer = kafka.consumer({
  groupId: "courseAssignedTopic-groupd",
});
await registrationServiceProducer.connect();
await courseServiceProducer.connect();
await courseServiceConsumer.connect();
await emailServiceConsumer.connect();

await courseServiceConsumer.subscribe({
  topic: "registrationSuccessfulTopic",
});
await emailServiceConsumer.subscribe({
  topic: "courseAssignedTopic",
});

await emailServiceConsumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    console.log("Received by email consumer:" + message.value.toString());
    console.log("Email sent successfully!");
  },
});

const assignUserToCourse = async (request) => {
  const { user_id, course_id } = request;

  pool.query(
    "INSERT INTO courses_users (course_id, user_id) VALUES ($1, $2)",
    [course_id, user_id],
    (error) => {
      if (error) {
        throw error;
      }
      // Produce new message
      courseServiceProducer.send({
        topic: "courseAssignedTopic",
        messages: [{ value: "User assigned" }],
      });
    }
  );
};

await courseServiceConsumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    console.log("Received by course consumer:" + message.value.toString());

    assignUserToCourse({
      user_id: 72,
      course_id: 1,
    });
  },
});

const registerUser = async (request) => {
  const { id, first_name, last_name, password, email, is_admin } = request.body;

  if (!first_name) {
    console.log("first_namjje is required.");
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
      registrationServiceProducer.send({
        topic: "registrationSuccessfulTopic",
        messages: [{ value: "User created" }],
      });
    }
  );
};

export default {
  registerUser,
};
