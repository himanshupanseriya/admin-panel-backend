const express = require("express");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://0.0.0.0:27017/organization", {
    useNewUrlParser: true,
  })
  .then(() => {console.log("connect ");}).catch((e)=>{console.log(e);});

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function () {
//   console.log("Connected successfully");
// });
