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
    message: "Welcome to the server",
    submittedData: null,
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


app.post('/submit', (req, res) => {
  const {name, email, message} = req.body;
  console.log(`Name: ${name}, Email: ${email}, message: ${message}`);


  // Success Message
res.render('form', {
  status: 'success',
  message: 'This form is submitteed successfully',
  submittedData: {name, email, message}

});
});

// If error Occurr
app.use((err, req, res) => {
  console.error("An error occurred while processing the request", err);
  res.status(500).return("form", {
    status: "fail",
    message: "There was an error processing your request Please try again",
    submittedData: null,
  });
});

// Defined user route
app.use("/api/v1/user", userRoute);
