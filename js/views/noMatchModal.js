define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'text!templates/noMatchModal.handlebars'
], function($, _, Backbone, Handlebars, noMatchModalTemplate){
  var NoMatchModal = Backbone.View.extend({
    id: 'no-match-modal',
    className: 'modal',
    events: {
      'click .close-modal': 'closeModal'
    },
    closeModal: function(e){
      e.preventDefault();
      this.remove();
    },
    initialize: function(){
      this.render();
    },
    render: function(){
      var template = Handlebars.compile(noMatchModalTemplate);
      this.$el.html(template(this.model.toJSON()));
      $('#main').append(this.$el);
    }
  });

  return NoMatchModal;
});