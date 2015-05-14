Blog.Views.Posts ||= {}

class Blog.Views.Posts.ShowView extends Backbone.View
  template: JST["templates/posts/show"]

  render: ->
    @el.innerHTML = @template(@model.toJSON())
    return this
