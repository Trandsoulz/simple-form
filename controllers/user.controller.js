import express from "express";

const userRoute = express.Router();

userRoute.get("/", (req, res, next) => {
  res.status(200).send({
    status: "success",
    message: "Server is up and running",
  });
});

// Define the post route to recieve that will the form data and display to the console

export default userRoute;
