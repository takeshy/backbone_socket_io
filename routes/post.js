var  Post = require('../models/post')
exports.index = function(req,res,next){
  Post.all(global.db,function(err,obj){
      if (err) return next(err);
      res.send(obj)
  });
}
exports.create = function(req,res,next){
  Post.create(global.db,req.body,function(err,obj){
      if (err) return next(err);
      res.send(obj)
      global.publisher.publish("post", JSON.stringify([obj]));
  });
}
exports.update = function(req,res,next){
  Post.update(global.db,req.body,function(err,obj){
      if (err) return next(err);
      res.send(obj)
      global.publisher.publish("post", JSON.stringify([obj]));
  });
}
exports.destroy = function(req,res,next){
  Post.destroy(global.db,req.params.id,function(err,obj){
    if (err) return next(err);
    res.send(obj)
    global.publisher.publish("post", JSON.stringify([obj]));
  });
}
