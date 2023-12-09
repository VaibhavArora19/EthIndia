require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("../backend/controller/index");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(router);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo DB Connected"))
  .catch((err) => console.log("error", err));

app.listen(8080, console.log("Server started"));
