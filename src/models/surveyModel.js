const sequelize = require("../configs/database");
const { DataTypes } = require("sequelize");

const Survey = sequelize.define(
  "responses",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullname: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    course: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    answers: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    // question_id: {
    //   type: DataTypes.STRING(50),
    //   allowNull: false,
    // },
    // question_text: {
    //   type: DataTypes.TEXT,
    //   allowNull: false,
    // },
    // answer_id: {
    //   type: DataTypes.TEXT,
    //   allowNull: false,
    // },
    // answer_text: {
    //   type: DataTypes.TEXT,
    //   allowNull: false,
    // },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Survey;
