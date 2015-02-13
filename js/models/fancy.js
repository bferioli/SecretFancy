var Fancy = Backbone.Model.extend({
	defaults: {
		first_name: null,
		email: null,
		message: null,
		user: null
	},
	idAttribute: '_id',
	urlRoot: '/api/fancies',
	initialize: function(){

	}
});