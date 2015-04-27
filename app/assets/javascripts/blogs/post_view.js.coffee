Blog.Views.Posts ||= {}

class Blog.Views.Posts.PostView extends Backbone.View
  template: JST["templates/posts/post"]

  events:
    "click .destroy" : "destroy"

  tagName: "tr"

  destroy: () ->
    @model.destroy()
    return false

  render: ->
    $(@el).html(@template(@model.toJSON()))
    return this
