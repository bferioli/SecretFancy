var FancyMessage = Backbone.View.extend({
	el: '#fancy-message',
	initialize: function(){
		this.render();
	},
	render: function(){
		var source = $('#FancyMessageTemplate').html();
		var template = Handlebars.compile(source);
		this.$el.html(template(this.model.toJSON()));
		console.log(this.model.toJSON());
	}
});