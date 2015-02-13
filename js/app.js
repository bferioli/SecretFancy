var app = app || {};

app.frontpage = {
	views: {},
	initAuthButton: function() {
		this.dom.sendButton.removeAttr('disabled');
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
			app.auth.doLogin($.proxy(this.createForm, this));
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