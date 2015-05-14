Blog.Views.Posts ||= {}

class Blog.Views.Posts.PostView extends Backbone.View
  template: JST["templates/posts/post"]

  events:
    "click .destroy" : "destroy"

  tagName: "tr"

  initialize: ()->
    @listenTo(@model,'destroy', @remove)
    @listenTo(@model,'change', @render)

  destroy: (e) ->
    e.preventDefault()
    e.stopPropagation()
    @model.destroy()
    window.router.navigate("/index",{trigger: true})

  render: ->
    @el.innerHTML = @template(@model.toJSON())
    return this
