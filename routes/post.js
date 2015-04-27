var  Post = require('../models/post')
exports.index = function(common,req,res){
  Post.all(common.db,function(err,obj){
      if (err) return next(err);
      res.send(obj)
  });
}
exports.create = function(common,req,res){
  Post.create(common.db,req.body,function(err,obj){
      if (err) return next(err);
      res.send(obj)
      common.publisher.publish("post", JSON.stringify([obj]));
  });
}
exports.update = function(common,req,res){
  Post.update(common.db,req.body,function(err,obj){
      if (err) return next(err);
      res.send(obj)
      common.publisher.publish("post", JSON.stringify([obj]));
  });
}
exports.destroy = function(common,req,res){
  Post.destroy(common.db,req.params.id,function(err,obj){
    if (err) return next(err);
    res.send(obj)
    common.publisher.publish("post", JSON.stringify([obj]));
  });
}
