const express = require("express");

const {
  getAllCommission,
  addCommission,
  updateCommissionData,
  deleteCommissionData,
  // getAllCommissionData,
} = require("./commission.controller"); //Import the commission restRouter
const commissionRouter = express.Router();

// all method routes
commissionRouter.get("/all/:id?", getAllCommission);
// commissionRouter.get("/all/:type?/:value?", getAllCommission);
commissionRouter.post("/add", addCommission);
commissionRouter.put("/update/:id", updateCommissionData);
commissionRouter.delete("/delete/:id", deleteCommissionData);

module.exports = commissionRouter;
