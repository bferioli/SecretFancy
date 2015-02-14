define([
	'jquery',
	'underscore',
	'backbone',
	'handlebars',
	// Using the Require.js text! plugin, we are loaded raw text
	// which will be used as our views primary template
	'text!templates/noMatchModal.handlebars'
], function($, _, Backbone, Handlebars, noMatchModalTemplate){
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
			var template = Handlebars.compile(noMatchModalTemplate);
			this.$el.html(template(this.model.toJSON()));
			$('#main').append(this.$el);
		}
	});

	return NoMatchModal;
});