import dotenv from "dotenv";
import path from "path";
import express, { json, urlencoded } from "express";
import userRoute from "./controllers/user.controller.js";
import { fileURLToPath } from "url";

//load environmental variables
dotenv.config();

// Global variables from .env
const { PORT, NODE_ENV } = process.env;

// Get the __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//initalize Express
const app = express();
app.use(urlencoded({ extended: true }));
app.use(json());

// Serve static files from the views directory
app.use(express.static(path.join(__dirname, "views")));

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

// Handle form submission

// sending a success response back.

// Error handling

// Defined user route
app.use("/api/v1/user", userRoute);

// Catch routes that have not been defined
app.all("*", (req, res, next) => {
  res.status(400).send({
    status: "fail",
    message: `Can't find "${req.originalUrl}" on this server`,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(
    `Running on ${NODE_ENV} environment on http://localhost:${PORT ?? 3000}`
  );
});
