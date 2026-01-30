const express = require("express");
const router = express.Router();
const { getAllDeals, getDealById } = require("../controllers/deal.controller.js");

router.get("/", getAllDeals);
router.get("/:id", getDealById);

module.exports = router;
