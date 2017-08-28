'use strict'

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const router = require('./routes/commentRoutes')
const authRouter = require('./routes/authRoutes')
const port = process.env.API_PORT || 3001;

mongoose.connect('mongodb://localhost/MERN');
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.use('/api',router);
app.use('/user',authRouter);

app.listen(port,function(){
  console.log(`api running on port ${port}`);
});
