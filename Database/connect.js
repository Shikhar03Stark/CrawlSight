'use strict';
const mongoose = require('mongoose');

const dbUrl = process.env.DB_URL;

const handler = mongoose.createConnection(dbUrl,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology : true,
});

module.exports = handler;
