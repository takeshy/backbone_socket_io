Blog.Views.Posts ||= {}
class Blog.Views.Posts.IndexView extends Backbone.View
  template: JST["templates/posts/index"]

  initialize: () ->
    @childViews = []
    @listenTo(@collection,'add', @addOne)

  addAll: () =>
    @collection.each(@addOne)

  addOne: (post) =>
    view = new Blog.Views.Posts.PostView({model : post})
    @el.getElementsByTagName("tbody")[0].appendChild(view.render().el)
    @childViews.push(view)

  remove: ()->
    _.each(@childViews,(view)->
      view.remove()
    )
    super()

  render: =>
    @el.innerHTML = @template()
    @addAll()
    @
