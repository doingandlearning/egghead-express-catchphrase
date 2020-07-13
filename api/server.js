const express = require("express");
const cors = require("cors");
const fs = require("fs");

const BASE_URL = "http://localhost:3001";
const imageDirectory = "/public";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", express.static("public"));
app.get("/images", (req, res) => res.json({ src: randomImage() }));

app.post("/guess", (req, res) => {
  const img = req.body.img.split("/").pop();
  const guess = req.body.guess;
  const correct = testGuess(guess);
  return res.json({});
});

app.listen(3001, function () {
  console.log("Server started.");
});

function testGuess(guess) {}

function randomImage() {
  const files = fs.readdirSync(__dirname + imageDirectory);
  const chosenFile = files[Math.floor(Math.random() * files.length)];
  return `${BASE_URL}/${chosenFile}`;
}
