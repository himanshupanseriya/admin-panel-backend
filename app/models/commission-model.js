//Require Mongoose
const mongoose = require("mongoose");

// Define commissionSchema
const commissionSchema = new mongoose.Schema({
  employee_id: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  commission: {
    type: Number,
    required: true,
  },
  tich: {
    type: Number,
    required: true,
  },
});

// Compile model from commission schema
const commission = mongoose.model("commission", commissionSchema);

module.exports = commission;
