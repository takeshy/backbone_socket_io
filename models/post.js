function Post(obj) {
  for (var key in obj) {
    this[key] = obj[key]; 
  }
}
function create(db,args,fn){
  var post = new Post(args);
  post.save(db,fn);
}
function all(db,fn){
  db.zrevrange("time", 0, -1,function(err,ids){
      var posts = []
      db.hgetall(ids.pop(),function(err,obj){ 
        if(err) return fn(err);
        if(obj){
          posts.push(obj);
        }
        if(ids.length == 0){
          return fn(null,posts);
        }
        db.hgetall(ids.pop(),arguments.callee);
      });
  });
}
function destroy(db,postId,fn){
  var self = this;
  var id = "post:" + postId;
  db.zrem("time",id,function(err){
    if (err) return fn(err);
    db.del(id,function(err,obj){
      if (err) return fn(err);
      var post = new Post({id: postId,deleted: true});
      fn(null,post);
      return;
    });
  });
}
function update(db,args,fn){
  var post = new Post(args);
  post.save(db,fn);
}
Post.prototype.save = function(db,fn){
  if (this.id) {
    this.set(db,fn);
  } else {
    var self = this;
    db.incr('post:ids', function(err, id){
      if (err) return fn(err);
      self.id = id.toString();
      self.set(db,function(err,obj){
        db.zadd('time', new Date().getTime(),'post:' + self.id,function(err){
          if (err) return fn(err);
          fn(null,obj);
        });
      });
    });
  }
};

Post.prototype.set = function(db,fn){
  var self = this;
  db.hmset('post:' + this.id, this,function(err,obj){
    if (err) return fn(err);
    fn(null,self);
  });
};
module.exports = {create: create,all: all,destroy: destroy,update: update}
