const express = require("express");
const { authenticate } = require("../middlewares/auth.middleware");
const {
  getRecordsWithDelay,
  getProfile,
  getRecords,
} = require("../controllers/records.controller");

const recordRouter = express.Router();
recordRouter.get("/profile", authenticate, getProfile);
recordRouter.get("/records", authenticate, getRecords);
recordRouter.get("/recordswithdelay", authenticate, getRecordsWithDelay);
module.exports = recordRouter;
