const questionaireModel = require("../models/questionaireModel");

const addQuestionaire = async (req, res) => {
  const { questions } = req.body;

  try {
    const newQuestionnaires = await Promise.all(
      questions.map(async (question) => {
        const { question_id, question_text, choices } = question;
        const newQuestionnaire = await questionaireModel.create({
          question_id: question_id,
          question_text: question_text,
          choices: choices,
          created_at: new Date(), // Set created_at to current timestamp
        });
        return newQuestionnaire;
      })
    );

    return res.status(201).json(newQuestionnaires);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllQuestionaire = async (req, res) => {
  try {
    const getQuestionaire = await questionaireModel.findAll();
    return res.status(200).json(getQuestionaire);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addQuestionaire,
  getAllQuestionaire,
};
