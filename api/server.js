const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { auth } = require("./utils/auth");

const BASE_URL = "http://localhost:3001";
const imageDirectory = "/public";
const answers = require("./answers");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", express.static("public"));
app.get("/images", auth, (req, res) => res.json({ src: randomImage() }));

app.post("/guess", auth, (req, res) => {
  const img = req.body.img.split("/").pop();
  const guess = req.body.guess;
  const result = testGuess(guess, img);
  const response = result
    ? { msg: "Well done! Click for a new image.", success: true }
    : {
      msg: "Not this time. Check your spelling and try again.",
      success: false,
    };
  return res.json(response);
});

app.listen(3001, function () {
  console.log("Server started.");
});

function testGuess(guess, img) {
  const answer = answers.filter((item) => item.image === img)[0].answer;
  return (
    answer.toLowerCase().replace(/ /g, "") ===
    guess.toLowerCase().replace(/ /g, "")
  );
}

function randomImage() {
  const files = fs.readdirSync(__dirname + imageDirectory);
  const chosenFile = files[Math.floor(Math.random() * files.length)];
  return `${BASE_URL}/${chosenFile}`;
}
