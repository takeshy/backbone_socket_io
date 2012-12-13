
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , redis = require('redis')
  , http = require('http')
  , path = require('path')
  , post = require('./routes/post')
  , redis = require("redis")

var app = express();

global.db = redis.createClient();
global.publisher  = redis.createClient();
global.subscriber = redis.createClient()

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
app.get('/posts', post.index);
app.post('/posts', post.create);
app.put('/posts/:id', post.update);
app.delete('/posts/:id', post.destroy);

var server = http.createServer(app)
var io = require('socket.io').listen(server);

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

postListener = io.of("/posts").on('connection', function (socket) { });

global.subscriber.subscribe("post");
global.subscriber.on("message", function(channel, message) {
  postListener.emit("post",message);
});
