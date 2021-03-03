'use strict';
const mongoose = require('mongoose');

const dbUrl = process.env.DB_URL;

const handler = mongoose.createConnection(dbUrl,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology : true,
});

handler.once('open', () => {
    console.log(`Database Connected : ${Date.now()}ms`);
})

module.exports = handler;
