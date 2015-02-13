var app = app || {};

app.frontpage = {
	views: {},
	initAuthButton: function() {
		this.dom.sendButton.removeAttr('disabled');
		this.dom.sendButton.on('click', $.proxy(this.newFancy, this));
	},
	newFancy: function() {
		if (app.auth && app.auth.user) {
			this.model = new Fancy();
			this.model.set({'user': app.auth.user.toJSON()});
			this.views.form = new FancyForm({model:this.model});
		} else if (app.auth) {
			app.auth.doLogin(this.createForm);
		}
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