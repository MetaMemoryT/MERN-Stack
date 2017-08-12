'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
  name : String,
  password : String
});

module.exports = mongoose.model('User', userSchema);
