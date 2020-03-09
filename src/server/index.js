require('dotenv').config();

const path = require('path');
const express = require('express');
const os = require('os');
const bodyParser = require('body-parser');
const cors = require('cors');
const InitiateMongoServer = require("./config/db");

// Initiate Mongo Server
InitiateMongoServer();

const app = express();
const foodRoutes = require('./routes/food');
const userRoutes = require("./routes/user");

app.use(bodyParser.json({ limit: "16mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "16mb", extended: true }));
app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/food', foodRoutes);
app.use("/api/user", userRoutes);

app.get("/", (request, response) => {
  response.sendFile(__dirname+"/index.html");
});

const PORT = process.env.PORT || 8080;
let server = app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});

module.exports = server;
