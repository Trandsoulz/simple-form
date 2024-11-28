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
app.post("/submit", (req, res) => {
  const { name, email, message } = req.body;  

  // Check if all fields are filled  
  if (!name || !email || !message) {  
    return res.status(400).render("form", {  
      status: "fail",  
      message: "Please fill in all fields.",  
      submittedData: null, 
    });  
  }  

  console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);  

  // sending a success response back.
  res.render("form", {
    status: "success",
    message: "Thank you for your submission!",
    submittedData: { name, email, message }, // Passing the submitted data
  });
});

// Error handling
app.use((error, req, res, next) => {
  console.error("An error occurred while processing the request:", error);
  res.status(500).render("form", {
    status: "fail",
    message: "There was an error processing your request. Please try again.",
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

// Start the server
app.listen(PORT, () => {
  console.log(
    `Running on ${NODE_ENV} environment on http://localhost:${PORT ?? 3000}`
  );
});
