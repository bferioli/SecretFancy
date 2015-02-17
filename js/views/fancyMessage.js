define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'text!templates/fancyMessage.handlebars'
], function($, _, Backbone, Handlebars, fancyMessageTemplate){
  var FancyMessage = Backbone.View.extend({
    el: '#fancy-message',
    events: {
      'submit #match-form': 'checkMatch'
    },
    checkMatch: function(e){
      e.preventDefault();

      var name = this.matchName.val();

      if (name === '')
        return this.showError('Please enter a name to check.');

      this.model.set({match_name: name});
      this.trigger('checkMatch');
    },
    showError: function(err){
      this.errorMsg.text(err);
      this.errorMsg.show();
      return false;
    },
    initialize: function(){
      this.render();
      this.errorMsg = this.$el.find('.error');
      this.matchName = this.$el.find('#match_name');
    },
    render: function(){
      var template = Handlebars.compile(fancyMessageTemplate);
      this.$el.html(template(this.model.toJSON()));
    }
  });

  return FancyMessage;
});