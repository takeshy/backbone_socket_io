class Blog.Routers.PostsRouter extends Backbone.Router
  initialize: (options) ->
    @posts = new Blog.Collections.PostsCollection(options.posts)
    @posts.listen("http://localhost:3000").done(()->
      Backbone.history.start()
    )

  draw: (view)->
    @view.remove() if @view
    $("#posts").html(view)
    @view = view

  routes:
    "new"      : "newPost"
    "index"    : "index"
    ":id/edit" : "edit"
    ":id"      : "show"
    ".*"        : "index"

  index: ->
    view = new Blog.Views.Posts.IndexView(collection: @posts)
    @draw(view.render().el)

  newPost: ->
    view = new Blog.Views.Posts.NewView(collection: @posts)
    @draw(view.render().el)

  show: (id) ->
    view = new Blog.Views.Posts.ShowView(model: @posts.get(id))
    @draw(view.render().el)

  edit: (id) ->
    view = new Blog.Views.Posts.EditView(model: @posts.get(id))
    @draw(view.render().el)

