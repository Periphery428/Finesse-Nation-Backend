require('dotenv').config();

const path = require('path');
const express = require('express');
const os = require('os');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const foodRoutes = require('./routes/food');

app.use(bodyParser.json({ limit: "16mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "16mb", extended: true }));
app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/food', foodRoutes);

app.get("/", (request, response) => {
  response.sendFile(__dirname+"/index.html");
});

let server = app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

module.exports = server;
