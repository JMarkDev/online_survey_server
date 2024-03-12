const express = require("express");
const router = express.Router();
const surveyController = require("../controllers/surveyController");
const {
  surveyValidationRules,
  validateForm,
} = require("../middlewares/validation");

router.get("/all", surveyController.getAllSurveys);
router.post(
  "/add",
  surveyValidationRules(),
  validateForm,
  surveyController.addSurvey
);
router.get("/:id", surveyController.getSurveyById);
router.get("/total/:year", surveyController.getAllTotalResponses);

module.exports = router;
