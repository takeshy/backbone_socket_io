class Blog.Routers.PostsRouter extends Backbone.Router
  initialize: (options) ->
    @posts = new Blog.Collections.PostsCollection(options.posts)
    @posts.listen("http://localhost:3000").done(()->
      Backbone.history.start()
    )
    @on("route",()=>
      @view.remove
    )

  routes:
    "new"      : "newPost"
    "index"    : "index"
    ":id/edit" : "edit"
    ":id"      : "show"
    ".*"        : "index"

  index: ->
    @view.remove() if @view
    @view = new Blog.Views.Posts.IndexView(collection: @posts)
    $("#posts").html(@view.render().el)

  newPost: ->
    @view.remove() if @view
    @view = new Blog.Views.Posts.NewView(collection: @posts)
    $("#posts").html(@view.render().el)

  show: (id) ->
    @view.remove() if @view
    @view = new Blog.Views.Posts.ShowView(model: @posts.get(id))
    $("#posts").html(@view.render().el)

  edit: (id) ->
    @view.remove() if @view
    @view = new Blog.Views.Posts.EditView(model: @posts.get(id))
    $("#posts").html(@view.render().el)

