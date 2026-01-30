const Deal = require("../models/deal.model.js");
const mongoose = require("mongoose");
const AppError = require("../utils/appError.js");


exports.getAllDeals = async (req, res, next) => {
  try {
    const deals = await Deal.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: deals.length,
      data: deals,
    });
  } catch (err) {
    next(err);
  }
};


exports.getDealById = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new AppError("Invalid deal ID format", 400));
    }

    const deal = await Deal.findById(id);
    if (!deal) {
      return next(new AppError("Deal not found", 404));
    }

    res.status(200).json({
      success: true,
      data: deal,
    });
  } catch (err) {
    next(err);
  }
};
