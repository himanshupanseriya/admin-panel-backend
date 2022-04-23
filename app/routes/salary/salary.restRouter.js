const express = require("express");

const { salaryList, addSalary } = require("./salary.controller"); //Import the salary controller

const salaryRouter = express.Router();

// all method routes
salaryRouter.get("/all/:type?/:value", salaryList);
salaryRouter.post("/add", addSalary);

module.exports = salaryRouter;
