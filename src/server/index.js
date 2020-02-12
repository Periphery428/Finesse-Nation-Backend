const path = require('path');
const express = require('express');
const os = require('os');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const foodRoutes = require('./routes/food');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));
app.use('/api/food', foodRoutes);

app.listen(8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
