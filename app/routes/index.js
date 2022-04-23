const express = require("express");
const Router = express.Router();

const employees = require("./employees"); // Employee Route
const commissions = require("./commission"); // Commission Route
const salary = require("./salary"); // Salary Route

//All requests to routes
Router.use("/employee", employees);
Router.use("/commission", commissions);
Router.use("/salary", salary);

module.exports = Router;
