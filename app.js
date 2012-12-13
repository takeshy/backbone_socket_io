
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , redis = require('redis')
  , http = require('http')
  , path = require('path')
  , Post = require('./models/post')
  , redis = require("redis")

var app = express();
var db = require("redis").createClient() 
  , subscriber = redis.createClient()
  , publisher  = redis.createClient();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  var Mincer  = require('mincer');
  var environment = new Mincer.Environment();
  environment.appendPath(__dirname + '/app/assets/javascript');
  app.use('/assets', Mincer.createServer(environment));
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/posts', postIndex);
app.post('/posts', postCreate);
app.put('/posts/:id', postUpdate);
app.delete('/posts/:id', postDestroy);

function postIndex(req,res,next){
  Post.all(db,function(err,obj){
      if (err) return next(err);
      res.send(obj)
  });
}
function postCreate(req,res,next){
  Post.create(db,req.body,function(err,obj){
      if (err) return next(err);
      res.send(obj)
      publisher.publish("post", JSON.stringify([obj]));
  });
}
function postUpdate(req,res,next){
  Post.update(db,req.body,function(err,obj){
      if (err) return next(err);
      res.send(obj)
      publisher.publish("post", JSON.stringify([obj]));
  });
}
function postDestroy(req,res,next){
  Post.destroy(db,req.params.id,function(err,obj){
    if (err) return next(err);
    res.send(obj)
    publisher.publish("post", JSON.stringify([obj]));
  });
}
var server = http.createServer(app)
var io = require('socket.io').listen(server);

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

postListener = io.of("/posts").on('connection', function (socket) { });

subscriber.subscribe("post");
subscriber.on("message", function(channel, message) {
  postListener.emit("post",message);
});
