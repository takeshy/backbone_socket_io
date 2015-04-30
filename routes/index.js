
/*
 * GET home page.
 */
var  Post = require('../models/post')
var fs = require('fs');
var path = null
function jsPath(fn){
  if(path){
    fn(path);
  }else{
    fs.readFile(__dirname.replace(/\/[^\/]+$/,"") + '/public/assets/manifest.json', 'utf8', function (err, text) {
      ret = JSON.parse(text);
      path = ret["assets"]["blogs.js"]
      fn(path);
    });
  }
}
exports.index = function(common,req, res){
  jsPath(function(path){
    Post.all(common.db,function(err,obj){
      if (err) return next(err);
      res.render('index',{path: path,initialData: JSON.stringify({posts: obj})});
    });
  });
};
