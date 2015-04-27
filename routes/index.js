
/*
 * GET home page.
 */
var  Post = require('../models/post')
exports.index = function(common,req, res){
  Post.all(common.db,function(err,obj){
    if (err) return next(err);
    res.render('index',{initialData: JSON.stringify({posts: obj})});
  });
};
