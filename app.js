const debug = require('debug')('restfulltest')
const name = 'restfulltest'
debug('booting %s', name)

var express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
    mongoose = require('mongoose');

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// db connection
mongoose.connect('mongodb://localhost/demos', function(err, res) {
 if(err) throw err;
 console.log('Connected to Database');
});

// Import Models and Controllers
var models = require('./models/demos')(app, mongoose);
var demosController = require('./controllers/demos');

// routing
var api = express.Router();

// routing /api and /
api.route(['/','/api'])
  .get(demosController.help)

// routing /api/demos
api.route('/api/demos')
  .get(demosController.findAll)
  .post(demosController.add);

// routing /api/demos/:id
api.route('/api/demos/:id')
 .get(demosController.findById)
 .put(demosController.update)
 .delete(demosController.delete);

app.use(api);

app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});
