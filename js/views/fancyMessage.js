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
		var source = $('#FancyMessageTemplate').html();
		var template = Handlebars.compile(source);
		this.$el.html(template(this.model.toJSON()));
	}
});