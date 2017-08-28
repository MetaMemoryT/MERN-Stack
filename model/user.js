'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
  name : {
      type: String,
      unique: true,
      required: true
  },
  password : {
      type: String,
      required: true
  },
  email: {
      type: String,
      unique: true,
      required: true
  },
  isVerified: {
      type: Boolean,
      default: false
  }
});

module.exports = mongoose.model('User', userSchema);
