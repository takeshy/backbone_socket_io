
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , post = require('./routes/post')
  , redis = require("redis")
  , redis = require("redis")
  , bodyParser = require('body-parser')
  , logger = require('morgan')
  , errorHandler = require('errorhandler');

var app = express();

var common = {}
common.db = redis.createClient();
common.publisher  = redis.createClient();
common.subscriber = redis.createClient()

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

if(app.get('env') == 'development'){
  var Mincer  = require('mincer');
  var environment = new Mincer.Environment();
  environment.appendPath(__dirname + '/app/assets/javascripts');
  app.use('/assets', Mincer.createServer(environment));
  app.use(errorHandler());
}

app.get('/', function(req,res){
  routes.index(common,req,res);
});
app.route('/posts')
.get(function(req,res){
  post.index(common,req,res);
})
.post(function(req,res){
  post.create(common,req,res);
})
.put(function(req,res){
  post.update(common,req,res);
})
.delete(function(req,res){
  post.destroy(common,req,res);
});

var server = http.createServer(app)
var io = require('socket.io').listen(server);

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

postListener = io.of("/posts").on('connection', function (socket) { });

common.subscriber.subscribe("post");
common.subscriber.on("message", function(channel, message) {
  postListener.emit("post",message);
});
