require.config({
	paths: {
		jquery: 'lib/jquery',
		maskedinput: 'lib/jquery.maskedinput',
		underscore: 'lib/underscore',
		backbone: 'lib/backbone',
		handlebars: 'lib/handlebars',
		templates: '../templates'
	}
});

require(['app'], function(App){
	App.initialize();
});