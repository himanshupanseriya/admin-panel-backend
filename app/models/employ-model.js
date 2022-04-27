//Require Mongoose
const mongoose = require("mongoose");

// Define employSchema
const employSchema = new mongoose.Schema({
  employee_code: {
    type: String,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  address1: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  form_entry_date: {
    type: Date,
  },
  process_date: {
    type: Date,
  },
  trial_start_date: {
    type: Date,
  },
  trial_end_date: {
    type: Date,
  },
  employee_start_date: {
    type: Date,
  },
  rejected_date: {
    type: Date,
  },
  profile_photo: {
    type: String,
  },
  aadharCard_photo: {
    type: String,
  },
  panCard_photo: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

// Compile model from employ schema
const employ = mongoose.model("employ", employSchema);

module.exports = employ;
