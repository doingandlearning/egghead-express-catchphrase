const express = require("express");
const request = require("request");
require("dotenv").config();

const app = express();
const {checkJwt} = require("./utils/auth");

app.get("/test", async (req, res) => {
  res.send("This is a test.")
});

app.get("/test-auth", checkJwt, async (req, res) => {
  res.send("This is a test.")
});

app.get("/get-token", (req, res) => {
  request({
    method: "POST",
    url: "https://dev-signup.eu.auth0.com/oauth/token",
    headers: {"content-type": "application/x-www-form-urlencoded"},
    form: {
      grant_type: "client_credentials",
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: "https://catchphrase.app"
    }
  }, function(error, response, body) {
    if (error) {
      res.status(400);
      res.send(error);
    }
    res.send(body);
  })
})

app.listen(3001, function () {
  console.log("Server started.");
});
