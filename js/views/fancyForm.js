var FancyForm = Backbone.View.extend({
	el: '#send-fancy',
	events: {
		'change #first_name': 'changeFirstName',
		'change #email': 'changeEmail',
		'change #message': 'changeMessage',
		'submit #fancy-form': 'sendMessage'
	},
	changeFirstName: function(){
		this.model.set({'first_name': this.firstName.val()});
	},
	changeEmail: function(){
		this.model.set({'email': this.email.val()});
	},
	changeMessage: function(){
		this.model.set({'message': this.message.val()});
	},
	sendMessage: function(e){
		e.preventDefault();
		this.model.save();
	},
	initialize: function(){
		this.render();
		this.firstName = this.$el.find('#first_name');
		this.email = this.$el.find('#email');
		this.message = this.$el.find('#message');
	},
	render: function(){
		var source = $('#FancyFormTemplate').html();
		var template = Handlebars.compile(source);
		this.$el.html(template(this.model.toJSON()));
	}
});