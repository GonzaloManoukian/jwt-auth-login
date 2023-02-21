const express = require('express')
const app = express()
const bodyParser = require('body-parser');
require('dotenv').config()

const connectDB = require('./config/db')
connectDB()

const cors = require('cors')
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
  }))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use("/api/auth", require("./routes/auth"));

module.exports = app;