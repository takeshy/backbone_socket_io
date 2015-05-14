class Blog.Models.Post extends Backbone.Model
  paramRoot: 'post'

  defaults:
    title: null
    content: null

class Blog.Collections.PostsCollection extends Backbone.Collection
  model: Blog.Models.Post
  url: '/posts'
  socket: null
  listen:(nodeUrl)->
    @socket = io.connect(nodeUrl + "/posts")
    @socket.on('connect', ()=>
      @addListener()
    )

  addListener:()->
    @socket.on("post", (msg)=>
      obj = JSON.parse(msg)
      _.each(obj,(postData)=>
        if postData.deleted
          @get(postData["id"])?.destroy()
        else
          @add(postData,{merge: true})
      )
    )

