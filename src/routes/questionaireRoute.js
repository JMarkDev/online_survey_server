const express = require("express");
const router = express.Router();
const questionaireController = require("../controllers/questionaireController");

router.get("/all", questionaireController.getAllQuestionaire);
router.post("/add", questionaireController.addQuestionaire);

module.exports = router;
