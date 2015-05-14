class Blog.Routers.PostsRouter extends Backbone.Router
  initialize: (options) ->
    @posts = new Blog.Collections.PostsCollection(options.posts)
    @posts.listen("http://localhost:3000")
    Backbone.history.start()

  draw: (view)->
    @view.remove() if @view
    elem = document.getElementById("posts")
    elem.innerHTML = ""
    elem.appendChild(view.render().el)
    @view = view

  routes:
    "new"      : "newPost"
    "index"    : "index"
    ":id/edit" : "edit"
    ":id"      : "show"
    ".*"        : "index"

  index: ->
    view = new Blog.Views.Posts.IndexView(collection: @posts)
    @draw(view)

  newPost: ->
    view = new Blog.Views.Posts.NewView(collection: @posts)
    @draw(view)

  show: (id) ->
    view = new Blog.Views.Posts.ShowView(model: @posts.get(id))
    @draw(view)

  edit: (id) ->
    view = new Blog.Views.Posts.EditView(model: @posts.get(id))
    @draw(view)

