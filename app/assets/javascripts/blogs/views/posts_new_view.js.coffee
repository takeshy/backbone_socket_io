Blog.Views.Posts ||= {}
class Blog.Views.Posts.NewView extends Backbone.View
  template: JST["templates/posts/new"]
  events:
    "submit #new-post": "save"
    "change #title": "changeTitle"
    "change #content": "changeContent"

  initialize: ()->
    @model = new Blog.Models.Post()

  changeTitle: (e)->
    @model.set("title",$(e.target).val())

  changeContent: (e)->
    @model.set("content",$(e.target).val())

  save: (e)->
    e.preventDefault()
    e.stopPropagation()
    @collection.create(@model.toJSON(),
      wait: true,
      success: (post)=>
        window.location.hash = "/#{post.id}"
    )

  render: ()->
    @$el.html(@template(@model.toJSON()))
    return this
