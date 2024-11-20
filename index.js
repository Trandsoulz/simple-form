import dotenv from "dotenv";
dotenv.config();

import express, { json, urlencoded } from "express";
import userRoute from "./controllers/user.controller.js";

// Global variables
const { PORT, NODE_ENV } = process.env;

const app = express();
app.use(urlencoded({ extended: true }));
app.use(json());

// Templating engine, used to build our website
app.set("view engine", "ejs");

// Serve the html form
app.get("/", (req, res, next) => {
  res.render("form", {
    status: "success",
    message: "Welcom to the server",
  });
});

// Defined user route
app.use("/api/v1/user", userRoute);

// Catch routes that have not been defined
app.all("*", (req, res, next) => {
  res.status(400).send({
    status: "fail",
    message: `Can't find "${req.originalUrl}" on this server`,
  });
});

app.listen(PORT, () => {
  console.log(
    `Running on ${NODE_ENV} environment on http://localhost:${PORT ?? 3000}`
  );
});
