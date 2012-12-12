class Blog.Models.Post extends Backbone.Model
  paramRoot: 'post'

  defaults:
    title: null
    content: null

  renewal: (params)->
    @set({ title: params["title"], content: params["content"]},{silent: true})

class Blog.Collections.PostsCollection extends Backbone.Collection
  model: Blog.Models.Post
  url: '/posts'
  socket: null
  listen:(nodeUrl)->
    deferred = jQuery.Deferred()
    @socket = io.connect(nodeUrl + "/posts")
    @socket.on('connect', ()=>
      deferred.resolve()
      @addListener()
    )
    deferred.promise()

  addListener:()->
    @socket.on("post", (msg)=>
      obj = jQuery.parseJSON(msg)
      _.each(obj,(postData)=>
        post = @get(postData["id"])
        if post
          if postData.deleted
            @remove(post,{silent: true})
          else
            post.renewal(postData)
        else if ! postData.deleted
          @add(new @model(postData),{silent: true})
      )
      @reset(@toArray())
    )

