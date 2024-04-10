const surveyModel = require("../models/surveyModel");
const date = require("date-and-time");
const sequelize = require("../configs/database");
const { Op } = require("sequelize");

const getAllSurveys = async (req, res) => {
  try {
    const surveys = await surveyModel.findAll();
    res.json(surveys);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const addSurvey = async (req, res) => {
  const { fullname, course, gender, answers } = req.body;

  try {
    const createdAt = new Date();
    const formattedDate = date.format(createdAt, "YYYY-MM-DD HH:mm:ss");

    const fullnameExist = await surveyModel.count({
      where: { fullname: fullname },
    });

    if (fullnameExist) {
      return res.status(400).json({
        status: "error",
        message: "Fullname already exist!",
      });
    }

    const newSurvey = await surveyModel.create({
      fullname: fullname,
      course: course,
      gender: gender,
      answers: answers,
      created_at: sequelize.literal(`'${formattedDate}'`),
    });

    return res.status(201).json({
      status: "success",
      message: "Survey submitted successfully",
      newSurvey,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getSurveyById = async (req, res) => {
  const id = req.params.id;
  try {
    const survey = await surveyModel.findByPk(id);
    res.json(survey);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getAllTotalResponses = async (req, res) => {
  const { year } = req.params;
   const course = [
    "ACT",
    "BSCS",
    "BSED",
    "BEED",
    "BSSW",
    "BSPOLSCIE",
    "BSCRIM",
    "AB FIL",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  try {
    const totalResponses = [];

    for (const month of months) {
      const monthlyCounts = { month };

      for (const crs of course) {
        const count = await surveyModel.count({
          where: {
            [Op.and]: [
              sequelize.where(
                sequelize.fn("YEAR", sequelize.col("created_at")),
                year
              ),
              sequelize.where(
                sequelize.fn("MONTH", sequelize.col("created_at")),
                months.indexOf(month) + 1
              ),
              { course: crs },
            ],
          },
        });

        monthlyCounts[crs] = count;
      }

      totalResponses.push(monthlyCounts);
    }

    return res.json(totalResponses);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllSurveys,
  addSurvey,
  getSurveyById,
  getAllTotalResponses,
};
