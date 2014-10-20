module.exports = function(app) {

  // Insert routes below
  app.use('/api/ingredientes', require('./api/ingrediente'));
  app.use('/api/recetas', require('./api/receta'));
 
 	// app.route('/:url(api|components|app|bower_components)/*')

	app.route('/app/:directory/:file')
		.get(function (req, res) {
      var a = Date.now();
      res.render(req.params.directory + '/' + req.params.file);
      var b = Date.now();
      console.log('jade ', b-a);
    });

 	app.route('/')
 		.get(function (req, res) {
 			var a = Date.now();
      res.render(app.get('appPath') + '/index.jade');
 		  var b = Date.now();
      console.log('index ', b-a);
    });
};
