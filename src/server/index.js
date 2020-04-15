require('dotenv').config();

const path = require('path');
const express = require('express');
// const os = require('os');
const bodyParser = require('body-parser');
const cors = require('cors');
const InitiateMongoServer = require("./config/db");
const apiKeyValidation = require("./middleware/apikey")

// Initiate Mongo Server
InitiateMongoServer();

const app = express();
const eventRoutes = require('./routes/event');
const userRoutes = require("./routes/user");
// const commentRoutes = require("./routes/comment");

app.use(bodyParser.json({ limit: "16mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "16mb", extended: true }));
app.use(cors());

// Custom middleware
// app.use(apiKeyValidation).unless({ path: ['/api/user/checkEmailTokenExists']});
app.use(apiKeyValidation);

// Routes
app.use('/api/food', eventRoutes);
app.use("/api/user", userRoutes);
// app.use("/api/comment", commentRoutes);


app.use(express.static(path.join(__dirname, "src/client/build")));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + "/src/client/build/index.html"), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
});

const PORT = process.env.PORT || 8080;
let server = app.listen(PORT, () => {
  console.log(`Server Started at PORT ${PORT}`);
});

module.exports = server;
