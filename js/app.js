var app = app || {};

app.core = {
	views: {

	},
	createForm: function() {
		if (auth && auth.user)
			this.model.set({'first_name': auth.user.get('first_name')});
		this.views.form = new FancyForm({model:this.model});
	},
	newFancy: function() {
		if (auth && auth.authenticated)
			this.createForm();
		else if (auth)
			auth.doLogin();
	},
	init: function() {
		this.model = new Fancy();
		app.dom.sendButton.on('click', $.proxy(this.newFancy, this));
	}
};

app.init = function() {
	app.dom = {
		sendButton: $('#send-button')
	};

	for (module in app) {
		if (app.hasOwnProperty(module) && typeof app[module] === 'object' && app[module].init)
			app[module].init();
	}
};

$(document).ready(function(){
	app.init();
});