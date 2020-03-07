require('dotenv').config();

const path = require('path');
const express = require('express');
const os = require('os');
const bodyParser = require('body-parser');
const cors = require('cors');

//fetching config file
const InitiateMongoServer = require("./config/db");

// Initiate Mongo Server
InitiateMongoServer();

const app = express();
const foodRoutes = require('./routes/food');
const userRoutes = require("./routes/user");

// PORT
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json({ limit: "16mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "16mb", extended: true }));
app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/food', foodRoutes);

app.get("/", (request, response) => {
  // response.json({ message: "API Working" });
  response.sendFile(__dirname+"/index.html");
});

/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
app.use("/api/user", userRoutes);

//https://stackoverflow.com/questions/4075287/node-express-eaddrinuse-address-already-in-use-kill-server
app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});

// let server = app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
// module.exports = server;
