const User = require('../model/user');
const jwt = require('jsonwebtoken');
const bycript = require('bcrypt-nodejs');
const config = require('./../config');
const utils = require('./../Utils/AuthUtils')

exports.login = (req,res) => {
  User.findOne({
    name : req.body.name
  }, function(err,user){
    if(err) throw err;
    if(!user){
      res.json({success : false, message: 'username salah', username: false});
    }else if(user){
      console.log(user);
      if(bycript.compareSync(req.body.password,user.password)){
        var token = jwt.sign(user, config.key.privateKey);
        console.log('berhasil Login');
        res.json({
          success : true,
          isVerified: user.isVerified,
          message : 'ini tokennya',
          token : token,
          id: user._id
        });
      } else {
        res.json({success : false, message : 'password salah', password: false});
      }
    }
  });
};

exports.signUp = (req,res) => {
  bycript.hash(req.body.password,null,null, function(err, hash){
    var user = new User();
    user.name = req.body.name;
    user.password = hash;
    user.email = req.body.email;
    user.isVerified = false;

    user.save(function(err){
      if(err) throw err;

      utils.sentMailVerificationLink(user,jwt.sign(user,config.key.privateKey),function(error,success){
        if(err) {
          res.json({success: false, message: 'gagal signup, ada kesalahan'});
        } else {
          res.json({success: true, message: 'cek email untuk verifikasi'});
        }
      })
    });
  });
}

exports.verify = (req, res) => {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  var id = req.body.id || req.query.id;
  jwt.verify(token,config.key.privateKey,function(err,decoded){
    if(err){
      console.log('something error')
      res.json({success: false, message: 'something wrong'});
    } else {
    User.findById(id,function(err,user){
      if(err) throw err;
      if(!user){
        res.json({success: false, message: 'user tidak ditemukan'});
      }else{
        if(user.isVerified){
          res.json({success: false, message: 'user sudah terverifikasi'})
        } else {
          user.isVerified = true;
          user.save(function(err){
            if(err) throw err;
            console.log('Berhasil memverifikasi user');
            res.redirect('http://localhost:3000/')
          })
        }
      }
    })
  }
 })
}
