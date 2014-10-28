module.exports = function (app) {

  // Insert routes below
  app.use('/api/alergenosIngrediente', require('./api/alergenoIngrediente'));
  app.use('/api/familiasIngrediente', require('./api/familiaIngrediente'));
  app.use('/api/ingredientes', require('./api/ingrediente'));
  app.use('/api/recetas', require('./api/receta'));
 	// app.route('/:url(api|components|app|bower_components)/*')

	app.route('/app/:directory/:file')
		.get(function (req, res) {
      res.render(req.params.directory + '/' + req.params.file);
    });

 	app.route('/')
 		.get(function (req, res) {
      res.render(app.get('appPath') + '/index.jade');
    });
};
