var app = app || {};

app.frontpage = {
	views: {},
	initAuthButton: function() {
		this.dom.sendButton.removeAttr('disabled');

		if (app.auth && app.auth.authenticated) {
			this.dom.sendButton.text('Send a fancy');
		} else {
			this.dom.sendButton.text('Login with Facebook');
			this.dom.sendButton.addClass('fb-auth');
		}

		this.dom.sendButton.on('click', $.proxy(this.newFancy, this));
	},
	createForm: function() {
		this.model = new Fancy();
		this.model.set({'user': app.auth.user.toJSON()});
		this.views.form = new FancyForm({model:this.model});
	},
	newFancy: function() {
		if (app.auth && app.auth.user)
			this.createForm();
		else if (app.auth)
			app.auth.doLogin($.proxy(this.newFancy, this));
	},
	init: function() {
		this.dom = {
			sendButton: $('#send-button')
		};
		this.initAuthButton();
	}
};

$(document).ready(function(){
	app.auth.init(function(){
		app.frontpage.init();
	});
});