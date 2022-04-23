const express = require("express");
const multer = require("multer");
// const path = require("path");
const upload = multer();
// const upload = multer();
// const cpUpload = upload.fields([
//   { profile_photo: "profile_photo" },
//   { aadharCard_photo: "aadharCard_photo" },
// ]);

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./data");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + file.originalname);
//     // cb(
//     //   null,
//     //   `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
//     // );
//   },
// });

// const upload = multer({ storage: storage });
const {
  getEmployeeData,
  createEmployeeData,
  updateEmployeeData,
  deleteEmployeeData,
  getEmployeeList,
} = require("./employee.controller"); //Import the employee controller

const employeeRouter = express.Router();

// all method routes
employeeRouter.get("/all/:id?", getEmployeeData);
employeeRouter.post(
  "/add",
  upload.fields([
    { name: "profile_photo" },
    { name: "aadharCard_photo" },
    { name: "panCard_photo" },
  ]),
  createEmployeeData
);
employeeRouter.post("/search", getEmployeeList);
employeeRouter.put("/update/:id", updateEmployeeData);
employeeRouter.delete("/delete/:id", deleteEmployeeData);

module.exports = employeeRouter;
