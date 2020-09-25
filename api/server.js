const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { auth } = require("./utils/auth");

const BASE_URL = "http://localhost:3001";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", express.static("public"));
const imageDirectory = "/public";

app.get("/", (req, res) => res.send("this is working"));
const answers = require("./answers.json");

app.get("/images", (req, res) => res.json({ src: selectRandomFile() }));

app.post("/guess", (req, res) => {
  const imageName = req.body.img.substring(req.body.img.lastIndexOf("/") + 1);
  const answer = answers.filter((item) => item.image === imageName)[0].answer;
  const result =
    answer.toLowerCase().replace(/ /g, "") ===
    req.body.guess.toLowerCase().replace(/ /g, "");

  const response = result
    ? { msg: "Well done! Click for a new image.", success: "yes" }
    : {
        msg: "Not this time. Check your spelling and try again.",
        success: "no",
      };

  res.json(response);
});

app.get("/images", auth, (req, res) => res.json({ src: randomImage() }));

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

function selectRandomFile() {
  const files = fs.readdirSync(__dirname + imageDirectory);
  const chosenFile = files[Math.floor(Math.random() * files.length)];
  return `${BASE_URL}/${chosenFile}`;
}
