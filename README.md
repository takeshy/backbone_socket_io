This is an application for trivial blog.
This is almost the same as backbone-rails.
But it uses node.js instead of rails.
and socket.io for  data sync and redis for data store.
The below link is nice reference for backbone-reails.
[A basic Rails and Backbone.js example](http://blog.crowdint.com/2012/08/28/a-basic-rails-and-backbone-js-example.html "A basic Rails and Backbone.js example")

# system requirements

* redis
* node.js


# start

```sh:command
npm install

redis-server

node_modules/mincer/bin/mincer.js -I app/assets/javascripts -o public/assets /Users/morita/pkg/backbone_socket_io/app/assets/javascripts/blogs.js.coffee

node_modules/uglify-js/bin/uglifyjs --compress --mangle -- `cat public/assets/manifest.json|grep 'blogs.js":'|awk '{sub(/.*:/,"");gsub(/[" ]/,"");print "public/assets/"$0} '` > public/assets/bundle.js

node app.js
```
