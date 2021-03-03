'use strict';
const mongoose = require('mongoose');

const UrlNodeSchema = new mongoose.Schema({
    id : {
        type : mongoose.SchemaTypes.ObjectId,
        default : mongoose.Types.ObjectId,
        createIndex : true,
        required : true,
    },
    protocol : {
        type : String,
        default : 'https',
        createIndex : true,
        required : true,
    },
    hostname : {
        type : String,
        required : true,
        createIndex : true,
    },
    path : {
        type : String,
        default : '',
        createIndex : true,
        required : true,
    },
    internalCount : {
        type : Number,
        default : 0,
        required : true,
    },
    externalCount : {
        type : Number,
        default : 0,
        required : true,
    },
    externalLinks : {
        type : [mongoose.SchemaType.ObjectId],
        default : [],
        required : true,
    },
    isVisited : {
        type : Boolean,
        default : false,
        required : true,
    }
});

module.exports = UrlNodeSchema;