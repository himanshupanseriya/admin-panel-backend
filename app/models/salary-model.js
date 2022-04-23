//Require Mongoose
const mongoose = require("mongoose");

// Define salarySchema
const salarySchema = new mongoose.Schema({
  employee_id: {
    type: String,
    required: true,
  },
  salary_month: {
    type: String,
    required: true,
  },
  paid_date: {
    type: Date,
    default: new Date().toString(),
  },
  paid_salary: {
    type: Number,
    required: true,
  },
});

// Compile model from salary schema
const salary = mongoose.model("salary", salarySchema);

module.exports = salary;
