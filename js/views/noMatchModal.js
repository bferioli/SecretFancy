var NoMatchModal = Backbone.View.extend({
	id: 'match-modal',
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
		var source = $('#NoMatchModalTemplate').html();
		var template = Handlebars.compile(source);
		this.$el.html(template(this.model.toJSON()));
		$('#fancy-message').append(this.$el);
	}
});