'use strict';
const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    nodeId : {
        type : mongoose.SchemaTypes.ObjectId,
        createIndex : true,
        required : true,
    },
    requestedOn : {
        type : Date,
        default : Date.now,
        required : true,
    },
    priority : {
        type : Number,
        default : 1,
        required : true,
    },
    ip : {
        type : [String],
        default : [],
        required : false,
    }
});

module.exports = RequestSchema;