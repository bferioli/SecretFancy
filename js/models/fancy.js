define([
	'underscore',
	'backbone'
], function(_, Backbone){
	var Fancy = Backbone.Model.extend({
		defaults: {
			delivery: 'text',
			first_name: null,
			match_name: null,
			phone: null,
			email: null,
			message: null,
			user: null
		},
		idAttribute: '_id',
		urlRoot: '/api/fancies'
	});

	return Fancy;
});
