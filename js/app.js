var app = app || {};

app.frontpage = {
	views: {},
	initAuthButton: function() {
		this.dom.sendButton.removeAttr('disabled');
		this.dom.sendButton.on('click', $.proxy(this.newFancy, this));
	},
	createForm: function() {
		this.model.set({'first_name': app.auth.user.get('first_name')});
		this.views.form = new FancyForm({model:this.model});
	},
	newFancy: function() {
		if (app.auth && app.auth.authenticated)
			this.createForm();
		else if (app.auth)
			app.auth.doLogin(this.createForm);
	},
	init: function() {
		this.dom = {
			sendButton: $('#send-button')
		};
		this.model = new Fancy();
		this.initAuthButton();
	}
};

$(document).ready(function(){
	app.auth.init(function(){
		app.frontpage.init();
	});
});