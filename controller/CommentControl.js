
const comments = require('./../model/comments');

exports.getAllComment = (req,res) => {

  comments.find()
  .sort({time: -1})
  .exec(function(err,comment){
    if(err)
      res.send(err);
    res.json(comment);
  });
}

exports.addNewComment = (req,res) => {

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
}

exports.updateComment = (req,res) => {

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
}

exports.deleteComment = (req,res) => {

  comments.remove({_id: req.params.comment_id},function(err,comment){
    if(err){
      res.send(err);
    }
    res.json({message: 'the comment has been deleted'});
  });
}
