'use strict'

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const comments = require('./model/comments');
const User = require('./model/user');
const jwt = require('jsonwebtoken');
const bycript = require('bcrypt-nodejs');

const app = express();
const router = express.Router();
const authRouter = express.Router();

const privateKey = 'dhimas';
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

authRouter.post('/authenticate',function(req,res){
  User.findOne({
    name : req.body.name
  }, function(err,user){
    if(err) throw err;
    if(!user){
      res.json({success : false, message: 'username salah', username: false});
    }else if(user){
      if(bycript.compareSync(req.body.password,user.password)){
        var token = jwt.sign(user, privateKey);
        res.json({
          success : true,
          message : 'ini tokennya',
          token : token,
          id: user._id
        });
      } else {
        res.json({success : false, message : 'password salah', password: false});
      }
    }
  });
});
authRouter.post('/signup',function(req,res){
  bycript.hash(req.body.password,null,null, function(err, hash){
    var user = new User();
    user.name = req.body.name;
    user.password = hash;

    user.save(function(err){
      if(err) throw err;
      console.log('User saved successfully');
      res.json({success : true});
    });
  });

})
router.use(function(req,res,next){
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if(token){
    jwt.verify(token,privateKey,function(err,decoded){
      if(err){
        return res.json({success: false, message: 'failed to authenticate token'});
      }else{
        req.decoded = decoded;
        next();
      }
    });
  }else{
    return res.status(403).send({
      success : false,
      message : 'no token provided'
    });
  }
});
router.get('/', function(req,res){
  res.json({message : 'API INITIALIZED'});
});

router.route('/comments')
  .get(function(req,res){

    comments.find()
    .sort({time: -1})
    .exec(function(err,comment){
      if(err)
        res.send(err);
      res.json(comment);
    });
  })
  .post(function(req,res){

    var c = new comments();
    c.author = req.body.author;
    c.text = req.body.text;
    c.time = req.body.time;
    c.userID = req.body.userID;
    c.save(function(err){
      if(err)
        res.send(err);
      res.json({message : 'comments successfully added'});
    });
  });

router.route('/comments/:comment_id')
  .put(function(req,res){

    comments.findById(req.params.comment_id,function(err, comment){
      if(err){
        res.send(err);
      }

      (req.body.author) ? comment.author = req.body.author : null;
      (req.body.text) ? comment.text = req.body.text : null;

      comment.save(function(err){
        if(err){
          res.send(err);
        }

        res.json({ message: 'comments has been updated'});
      });
    });
  })
  .delete(function(req,res){

    comments.remove({_id: req.params.comment_id},function(err,comment){
      if(err){
        res.send(err);
      }
      res.json({message: 'the comment has been deleted'});
    });
  });


app.use('/api',router);
app.use('/user',authRouter);

app.listen(port,function(){
  console.log(`api running on port ${port}`);
});
