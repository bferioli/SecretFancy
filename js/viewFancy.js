var app = app || {};

app.viewFancy = {
	model: null,
	views: {},
	showMessage: function() {
		this.views.model = new FancyMessage({model:this.model});
	},
	init: function() {
		var href = window.location.href,
			id = href.substr(href.lastIndexOf('/') + 1);

		this.model = new Fancy({_id: id});
		this.model.fetch({success: $.proxy(this.showMessage, this)});
	}
};

$(document).ready(function(){
	app.viewFancy.init();
});