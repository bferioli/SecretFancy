require.config({
  baseUrl: '/js',
  paths: {
    jquery: 'lib/jquery',
    maskedinput: 'lib/jquery.maskedinput',
    underscore: 'lib/underscore',
    backbone: 'lib/backbone',
    handlebars: 'lib/handlebars',
    templates: '../templates',
    text: 'lib/text'
  }
});

require(['viewFancy'], function(ViewFancy){
  ViewFancy.initialize();
});