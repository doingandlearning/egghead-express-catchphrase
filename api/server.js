const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const imageDirectory = "/public";
const BASE_URL = "http://localhost:3001";

app.use("/", express.static("public"));
app.use(cors());

app.get("/images", (req, res) => res.json({ src: selectRandomFile() }));
app.listen(3001, function () {
  console.log("Server started.");
});

function selectRandomFile() {
  const files = fs.readdirSync(__dirname + imageDirectory);
  const chosenFile = files[Math.floor(Math.random() * files.length)];
  return `${BASE_URL}/${chosenFile}`;
}
