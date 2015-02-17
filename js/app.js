define([
  'jquery',
  'maskedinput',
  'underscore',
  'backbone',
  'handlebars',
  'models/fancy',
  'models/user',
  'views/fancyForm',
  'views/messageSentModal',
  'auth'
], function($, MaskedInput, _, Backbone, Handlebars, Fancy, User, FancyForm, MessageSentModal, Auth){
  var App = {
    dom: {},
    model: null,
    views: {},
    initAuthButton: function() {
      this.dom.sendButton.removeAttr('disabled');

      if (Auth && Auth.authenticated) {
        this.dom.sendButton.text('Send a fancy');
      } else {
        this.dom.sendButton.text('Login with Facebook');
        this.dom.sendButton.addClass('fb-auth');
      }

      this.dom.sendButton.on('click', $.proxy(this.newFancy, this));
    },
    createForm: function() {
      this.dom.sendButton.hide();
      this.model = new Fancy();
      this.model.set({'user': Auth.user.toJSON()});
      this.views.form = new FancyForm({model:this.model});
      this.views.form.on('messageSent', $.proxy(this.sendCallback, this));
    },
    newFancy: function() {
      if (Auth && Auth.user)
        this.createForm();
      else if (Auth)
        Auth.doLogin($.proxy(this.newFancy, this));
    },
    sendCallback: function() {
      this.dom.sendButton.show();
      this.views.modal = new MessageSentModal({model:this.model});
    },
    initialize: function() {
      this.dom.sendButton = $('#send-button');

      Auth.initialize($.proxy(this.initAuthButton, this));
    }
  };

  return App;
});