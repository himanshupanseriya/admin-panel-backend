//Import the mongoose module
const mongoose = require("mongoose");

//Set up mongoose connection
setTimeout(() => {
  mongoose
    .connect(process.env.dbConfigUrl) //invoking the dotenv dbConfigUrl
    .then(() => {
      console.log("connect ");
    })
    .catch((e) => {
      console.log(e);
    });
}, 500);
