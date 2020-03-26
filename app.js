const express = require('express');
const cors = require('cors');

const app = express();
//app.use(cors());
app.use(express.json());
const activityRoute = require('./routes/activities');
app.use('/activities',activityRoute);

module.exports = app;