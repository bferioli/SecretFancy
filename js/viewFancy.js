var app = app || {};

app.viewFancy = {
	model: null,
	views: {},
	init: function() {
		// var href = window.location.href,
		// 	id = href.substr(href.lastIndexOf('/') + 1);

		var id = window.location.hash.substr(1);

		this.model = new Fancy({_id: id});
		this.model.fetch();
		this.views.model = new FancyMessage({model:this.model});
	}
};

$(document).ready(function(){
	app.viewFancy.init();
});