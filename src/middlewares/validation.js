const { body, validationResult } = require("express-validator");

const surveyValidationRules = () => {
  return [
    body("fullname").notEmpty().withMessage("Fullname is required."),
    body("course").notEmpty().withMessage("Course is required."),
    body("gender").notEmpty().withMessage("Gender is required."),
    body("answers").notEmpty().withMessage("This field is required."),
  ];
};

const validateForm = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400).json({ errors: errors.array() });
};

module.exports = {
  surveyValidationRules,
  validateForm,
};
