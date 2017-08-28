const commentController = require('./../controller/CommentControl');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const config = require('./../config');


router.use(function(req,res,next){
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if(token){
    jwt.verify(token,config.key.privateKey,function(err,decoded){
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

router.route('/comments')
  .get(commentController.getAllComment)
  .post(commentController.addNewComment);

router.route('/comments/:comment_id')
  .put(commentController.updateComment)
  .delete(commentController.deleteComment);


module.exports = router;
