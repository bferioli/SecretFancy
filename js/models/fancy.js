var Fancy = Backbone.Model.extend({
	defaults: {
		email: null,
		message: null,
		user: null
	},
	url: '/api/fancies',
	initialize: function(){

	}
});