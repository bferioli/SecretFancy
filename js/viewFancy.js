define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'heartsBackground',
  'models/fancy',
  'views/fancyMessage',
  'views/matchModal',
  'views/noMatchModal',
], function($, _, Backbone, Handlebars, HeartsBackground, Fancy, FancyMessage, MatchModal, NoMatchModal){
  ViewFancy = {
    model: null,
    views: {},
    checkMatch: function() {
      var self = this;
      var params = {
        fancy_id: this.model.get('_id'),
        match_name: this.model.get('match_name')
      };

      $.post( "/api/match", params)
        .done(function(res) {
          self.model.set('match', res.match);

          if (res.match)
            self.views.match = new MatchModal({model:self.model});
          else
            self.views.noMatch = new NoMatchModal({model:self.model});
        })
        .fail(function(err) {
          self.views.message.showError(err.responseText);
        });
    },
    showMessage: function() {
      this.views.message = new FancyMessage({model:this.model});
      this.views.message.on('checkMatch', $.proxy(this.checkMatch, this));
    },
    initialize: function() {
      var href = window.location.href,
        id = href.substr(href.lastIndexOf('/') + 1);

      this.model = new Fancy({_id: id});
      this.model.fetch({success: $.proxy(this.showMessage, this)});
      HeartsBackground.initialize();
    }
  };

  return ViewFancy;
});