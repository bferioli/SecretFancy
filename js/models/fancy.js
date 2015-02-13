var Fancy = Backbone.Model.extend({
	defaults: {
		email: null,
		message: null,
		user: null
	},
	idAttribute: '_id',
	urlRoot: '/api/fancies',
	initialize: function(){

	}
});