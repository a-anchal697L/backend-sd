const Claim = require("../models/claim.model.js");
const Deal = require("../models/deal.model.js");
const userModel = require("../models/user.model.js");
const AppError = require("../utils/appError.js");
const mongoose = require("mongoose");

exports.claimDeal = async (req, res, next) => {
  try {
    const user = req.user;
    const dealId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(dealId)) {
      return next(new AppError("Invalid deal ID", 400));
    }
    if (user.role === "admin") {
      return next(
        new AppError("Admin users are not allowed to claim deals", 403)
      );
    }

    const deal = await Deal.findById(dealId);
    if (!deal) {
      return next(new AppError("Deal not found", 404));
    }

    if (deal.isLocked && !user.isVerified) {
      return next(
        new AppError("You must verify your account to claim this deal", 403)
      );
    }

    const alreadyClaimed = await Claim.findOne({
      user: user._id,
      deal: deal._id,
    });

    if (alreadyClaimed) {
      return next(new AppError("You have already claimed this deal", 400));
    }

    const claim = await Claim.create({
      user: user._id,
      deal: deal._id,
      status: "pending",
    });

    res.status(201).json({
      success: true,
      message: "Deal claimed successfully",
      data: claim,
    });
  } catch (err) {
    next(err);
  }
};


exports.getUserClaims = async (req, res, next) => {
  try {
    const claims = await Claim.find({ user: req.user._id })
      .populate("deal")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: claims.length,
      data: claims,
    });
  } catch (err) {
    next(err);
  }
};


exports.updateClaimStatus = async (req, res, next) => {
  try {
    const { claimId, status } = req.body;

    if (!claimId || !status) {
      return next(new AppError("Claim ID and status are required", 400));
    }
    if (!mongoose.Types.ObjectId.isValid(claimId)) {
      return next(new AppError("Invalid claim ID", 400));
    }

    if (!["pending", "approved", "rejected"].includes(status)) {
      return next(new AppError("Invalid claim status", 400));
    }

    const claim = await Claim.findById(claimId).populate("deal");

    if (!claim) {
      return next(new AppError("Claim not found", 404));
    }

    claim.status = status;
    await claim.save();

    res.status(200).json({
      success: true,
      message: "Claim status updated",
      data: claim,
    });
  } catch (err) {
    next(err);
  }
};


exports.getAllClaimedDeals = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user || user.role !== "admin") {
      return next(new AppError("Access denied: Admins only", 403));
    }
    const claims = await Claim.find()
      .populate("deal") 
      .populate("user", "name email role")
      .sort({ createdAt: -1 });
    const formatted = claims.map((c) => ({
      _id: c._id,
      dealTitle: c.deal.title,
      userName: c.user.name,
      userEmail: c.user.email,
      status: c.status,
      claimedAt: c.createdAt,
    }));

    res.status(200).json({
      success: true,
      count: claims.length,
      data: formatted,
    });
  } catch (err) {
    next(err);
  }
};



exports.isClaimed = async (req, res, next) => {
  try {
    const { userId, dealId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return next(new AppError("Invalid user ID", 400));
    }
    if (!mongoose.Types.ObjectId.isValid(dealId)) {
      return next(new AppError("Invalid deal ID", 400));
    }
    const user = await userModel.findById(userId);
    if (!user) {
      return next(new AppError("User not found", 404));
    }


    if (user.role === "admin") {
      return next(new AppError("Admin users cannot claim deals", 403));
    }

    const claim = await Claim.findOne({ user: userId, deal: dealId });

    res.status(200).json({
      success: true,
      claimed: !!claim, 
      claimData: claim || null,
    });
  } catch (err) {
    next(err);
  }
};
