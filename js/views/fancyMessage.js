define([
	'jquery',
	'underscore',
	'backbone',
	'handlebars',
	// Using the Require.js text! plugin, we are loaded raw text
	// which will be used as our views primary template
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

			if (name === '') {
				this.showError('Please enter a name to check.');
				return;
			}

			this.model.set({match_name: name});
			this.trigger('checkMatch');
		},
		showError: function(err){
			this.errorMsg.text(err);
			this.errorMsg.show();
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