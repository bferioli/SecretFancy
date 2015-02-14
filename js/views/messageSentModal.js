define([
	'jquery',
	'underscore',
	'backbone',
	'handlebars',
	'text!templates/messageSentModal.handlebars'
], function($, _, Backbone, Handlebars, messageSentModalTemplate){
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
			var template = Handlebars.compile(messageSentModalTemplate);
			this.$el.html(template(this.model.toJSON()));
			$('#main').append(this.$el);
		}
	});

	return MessageSentModal;
});