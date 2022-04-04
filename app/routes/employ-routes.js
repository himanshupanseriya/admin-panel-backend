const express = require("express");
const employModel = require("../models/employ-model");
const app = express();

app.post("/add", async (request, response) => {
  const user = new employModel(request.body);
  try {
    await user.save();
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/all", async (request, response) => {
  const users = await employModel.find({});

  try {
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;
