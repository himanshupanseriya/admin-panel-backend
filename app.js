const express = require("express");
const database = require("./config/database");
const app = express();
const port = 3000;

app.use(express.json());
require("./config/database");

app.get("/", (req, res) => {
  res.send("ooooooooooooooooooooo");
});


const employRoute = require("./app/routes/employ-routes");
app.use("/employ", employRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
