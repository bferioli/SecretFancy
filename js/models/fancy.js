var Fancy = Backbone.Model.extend({
	defaults: {
		email: null,
		message: null,
		user: null
	},
	url: '/api/fancy',
	initialize: function(){

	}
});