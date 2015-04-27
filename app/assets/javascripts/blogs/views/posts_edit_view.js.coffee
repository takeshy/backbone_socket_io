Blog.Views.Posts ||= {}

class Blog.Views.Posts.EditView extends Backbone.View
  template : JST["templates/posts/edit"]

  events :
    "submit #edit-post" : "update"
    "change #title": "changeTitle"
    "change #content": "changeContent"

  changeTitle: (e)->
    @model.set("title",$(e.target).val())

  changeContent: (e)->
    @model.set("content",$(e.target).val())

  update : (e) ->
    e.preventDefault()
    e.stopPropagation()

    @model.save(null,
      success : (post) =>
        @model = post
        window.location.hash = "/#{@model.id}"
    )

  render : ->
    $(@el).html(@template(@model.toJSON() ))
    return this

