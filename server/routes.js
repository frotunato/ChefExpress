module.exports = function (app) {

  // Insert routes below

  app.use('/login', require('./auth')); 
  app.use('/api/usuarios', require('./api/usuario'));
  app.use('/api/alergenos', require('./api/alergeno'));
  app.use('/api/intolerancias', require('./api/intolerancia'));
  app.use('/api/ingredientes', require('./api/ingrediente'));
  app.use('/api/familias', require('./api/familia'));
  app.use('/api/recetas', require('./api/receta'));
 	app.use('/api/ambitos', require('./api/ambito'));
  app.use('/api/tipos', require('./api/tipo'));
  app.use('/api/puntosCriticos', require('./api/puntoCritico'));
  app.use('/api/categorias', require('./api/categoria'));
  app.use('/api/procedencias', require('./api/procedencia'));
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
