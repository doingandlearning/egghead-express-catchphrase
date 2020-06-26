const express = require("express");
const cors = require("cors");

const app = express();

app.use("/", express.static("public"));

app.get("/", (req, res) => res.send("this is working"));
app.listen(3001, function () {
  console.log("Server started.");
});
