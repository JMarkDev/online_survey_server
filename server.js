const express = require("express");
const app = express();
require("dotenv").config();
const database = require("./src/configs/database");
const PORT = process.env.PORT || 5000;
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");

const surveyRoute = require("./src/routes/surveyRoute");
const questionaireRoute = require("./src/routes/questionaireRoute");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/survey", surveyRoute);
app.use("/questionaire", questionaireRoute);
// Server setup
const server = http.createServer(app);

app.use(
  cors({
    origin: "https://online-survey.onrender.com/",
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  database.authenticate();
  database
    .sync({ force: false }) // Use { force: true } during development to drop and recreate tables
    .then(() => {
      console.log("Connected to database");
    })
    .catch((error) => {
      console.error("Unable to connect to the database:", error);
    });
});

