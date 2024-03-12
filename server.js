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
    origin: "http://localhost:5173/",
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  database
    .authenticate()
    //   .sync({ alter: true }) // Use { force: true } during development to drop and recreate tables
    .then(() => {
      console.log("Connected to database");
    })
    .catch((error) => {
      console.error("Unable to connect to the database:", error);
    });
});
