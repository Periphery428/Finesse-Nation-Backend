require('dotenv').config();

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger');
const InitiateMongoServer = require("./config/db");
const apiKeyValidation = require("./middleware/apikey")

// Initiate Mongo Server
InitiateMongoServer();

const app = express();
const eventRoutes = require('./routes/event');
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const commentRoutes = require("./routes/comment");
const voteRoutes = require("./routes/vote");
const schedulerInAction = require("./controllers/ScheduleCleanUp");

app.use(bodyParser.json({ limit: "16mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "16mb", extended: true }));
app.use(cors());

// Custom middleware
app.use(apiKeyValidation);

// Calling the scheduler
schedulerInAction();

// Routes
// Swagger api docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
// App api routes
app.use('/api/food', eventRoutes);
app.use("/api/user", userRoutes);
app.use("/admin/api/user", adminRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/vote", voteRoutes);

app.use(express.static(path.join("/app/src/client/build")));
app.get('*', function(req, res) {
  res.sendFile(path.join("/app/src/client/build/index.html"), function(err) {
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
