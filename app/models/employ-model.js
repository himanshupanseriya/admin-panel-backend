const mongoose = require("mongoose");
const employSchema = require("../schema/employ-schema");

const employ = mongoose.model("employ", employSchema);

module.exports = employ;