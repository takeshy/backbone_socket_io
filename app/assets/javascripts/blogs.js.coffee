#= require ./lib/underscore-min.js
#= require ./lib/backbone.js
#= require ./lib/socket.io.min.js
#= require ./lib/backbone.nativeview.js
#= require ./lib/backbone.nativeajax.js
#= require_self
#= require_tree ./templates
#= require_tree ./blogs
Backbone.View = Backbone.NativeView
window.Blog =
  Models: {}
  Collections: {}
  Routers: {}
  Views: {}
