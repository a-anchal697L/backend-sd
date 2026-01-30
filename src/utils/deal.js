const { param } = require("express-validator");

exports.claimValidation = [
  param("id").isMongoId().withMessage("Valid deal ID is required"),
];
