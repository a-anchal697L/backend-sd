const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      index: true,
    },

    description: {
      type: String,
      required: true,
    },

    discount: {
      type: String,
      required: true,
    },

    partnerName: {
      type: String,
      required: true,
    },

    isLocked: {
      type: Boolean,
      default: false,
    },

    eligibility: {
      type: String,
      default: "Open for all startups",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Deal", dealSchema);
