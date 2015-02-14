var MessageSentModal = Backbone.View.extend({
	id: 'message-sent-modal',
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
		var source = $('#MessageSentModalTemplate').html();
		var template = Handlebars.compile(source);
		this.$el.html(template(this.model.toJSON()));
		$('#main').append(this.$el);
	}
});