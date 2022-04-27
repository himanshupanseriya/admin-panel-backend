const express = require("express");
const multer = require("multer");
const upload = multer();

const {
  getEmployeeData,
  createEmployeeData,
  updateEmployeeData,
  deleteEmployeeData,
  getEmployeeRecord,
} = require("./employee.controller"); //Import the employee controller

const employeeRouter = express.Router();

// all method routes
employeeRouter.get("/all/:id?", getEmployeeRecord);
employeeRouter.post(
  "/add",
  upload.fields([
    { name: "profile_photo" },
    { name: "aadharCard_photo" },
    { name: "panCard_photo" },
  ]),
  createEmployeeData
);
employeeRouter.post("/search", getEmployeeData);
employeeRouter.put(
  "/update/:id",
  upload.fields([
    { name: "profile_photo" },
    { name: "aadharCard_photo" },
    { name: "panCard_photo" },
  ]),
  updateEmployeeData
);
employeeRouter.delete("/delete/:id", deleteEmployeeData);

module.exports = employeeRouter;
