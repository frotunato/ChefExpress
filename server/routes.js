module.exports = function (app) {

  // Insert routes below

  app.use('/login', require('./auth')); 
  app.use('/api/usuarios', require('./api/usuario'));
  app.use('/api/alergenosIngrediente', require('./api/alergenoIngrediente'));
  app.use('/api/intoleranciasIngrediente', require('./api/intoleranciaIngrediente'));
  app.use('/api/familiasIngrediente', require('./api/familiaIngrediente'));
  app.use('/api/ingredientes', require('./api/ingrediente'));
  app.use('/api/recetas', require('./api/receta'));
 	app.use('/api/ambitosReceta', require('./api/ambitoReceta'));
  app.use('/api/familiasReceta', require('./api/familiaReceta'));
  app.use('/api/tiposReceta', require('./api/tipoReceta'));
  app.use('/api/medidasPreventivasReceta', require('./api/medidaPreventivaReceta'));
  app.use('/api/peligrosDesarrolloReceta', require('./api/peligroDesarrolloReceta'));
  app.use('/api/peligrosIngredientesReceta', require('./api/peligroIngredienteReceta'));
  app.use('/api/categoriasReceta', require('./api/categoriaReceta'));
  app.use('/api/procedenciasReceta', require('./api/procedenciaReceta'));
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
