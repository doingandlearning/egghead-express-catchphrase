const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const imageDirectory = "/public";
const BASE_URL = "http://localhost:3001";
const answers = require("./answers.json");

app.use("/", express.static("public"));
app.use(cors());
app.use(express.json());

app.get("/images", (req, res) => res.json({ src: selectRandomFile() }));

app.post("/guess", (req, res) => {
  const imageName = req.body.image.substring(
    req.body.image.lastIndexOf("/") + 1
  );
  const answer = answers.filter((item) => item.image === imageName)[0].answer;
  const result =
    answer.toLowerCase().replace(/ /g, "") ===
    req.body.guess.toLowerCase().replace(/ /g, "");

  const message = result
    ? "Well done! Click for a new image."
    : "Not this time. Check your spelling and try again.";

  res.json({ msg: message });
});

app.listen(3001, function () {
  console.log("Server started.");
});

function selectRandomFile() {
  const files = fs.readdirSync(__dirname + imageDirectory);
  const chosenFile = files[Math.floor(Math.random() * files.length)];
  return `${BASE_URL}/${chosenFile}`;
}
