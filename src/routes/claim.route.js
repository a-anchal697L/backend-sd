const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.js");
const { claimDeal, getUserClaims, updateClaimStatus, getAllClaimedDeals, isClaimed } = require("../controllers/claim.controller.js");
const { claimValidation } = require("../utils/deal.js");
const adminMiddleware = require("../middleware/admin.js");

router.get("/", authMiddleware, getUserClaims);
router.post("/:id", authMiddleware, claimValidation, claimDeal);
router.patch("/status", authMiddleware, adminMiddleware, updateClaimStatus);
router.get("/all", authMiddleware, adminMiddleware, getAllClaimedDeals );
router.get("/isclaimed/:userId/:dealId", authMiddleware, isClaimed);

module.exports = router;
