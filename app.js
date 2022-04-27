const express = require("express"); // Initialize express
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/xwww-form-urlencoded
app.use(bodyParser.json()); // parse application/json

require("dotenv").config();
require("./config/database");

const cors = require("cors"); // This is CORS-enabled for all origins!

const employRoute = require("./app/routes"); // Include custom routes

const port = process.env.PORT || 5000; // Choose a port to listen on
app.use(cors());

app.use(express.json()); // for parsing application/json
app.use("/", employRoute);
const staticPath = path.join(__dirname + "/public");
app.use(express.static(staticPath)); // Static Middleware

// Tell the app what port to listen on
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
