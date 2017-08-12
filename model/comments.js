'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var commentsSchema = new Schema({
  author : String,
  text : String,
  time : Number,
  userID: String
});

module.exports = mongoose.model('Comment', commentsSchema);
