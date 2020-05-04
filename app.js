const express = require('express');
const app = express();

const activityRoute = require('./routes/activities');
const userRoute = require('./routes/users')
const adminRoute = require('./routes/admins');
const checkinRoute = require('./routes/checkin');
//app.use(cors());

app.use(express.json());
app.use(express.urlencoded())
app.use('/activities',activityRoute);
app.use('/users', userRoute);
app.use('/admins', adminRoute);
app.use('/checkin', checkinRoute);

module.exports = app;