const express = require("express");
const app = express();
require("express-async-errors");
const { errorHandling } = require("./utils/error");

app.get("/test", async (req, res) => {
  throw new Error("Oh no! The world has ended!");
});

app.use(errorHandling);

app.listen(3001, function () {
  console.log("Server started.");
});
