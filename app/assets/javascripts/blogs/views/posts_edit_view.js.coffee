Blog.Views.Posts ||= {}

class Blog.Views.Posts.EditView extends Backbone.View
  template : JST["templates/posts/edit"]

  events :
    "submit #edit-post" : "update"
    "change #title": "changeTitle"
    "change #content": "changeContent"

  changeTitle: (e)->
    @model.set("title",e.target.value)

  changeContent: (e)->
    @model.set("content",e.target.value)

  update : (e) ->
    e.preventDefault()
    e.stopPropagation()

    @model.save(null,
      success : (post) =>
        @model = post
        window.location.hash = "/#{@model.id}"
    )

  render : ->
    @el.innerHTML = @template(@model.toJSON())
    return this

