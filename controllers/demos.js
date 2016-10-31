var mongoose = require('mongoose');
var Demo = mongoose.model('Demo');

//GET - Return all registers
exports.findAll = function(req, res) {
  Demo.find(function(err, demos) {
    if(err) res.send(500, err.message);
    console.log('GET /demos')
    res.status(200).jsonp(demos);
  });
};

//GET - Return a register with specified ID
exports.findById = function(req, res) {
  Demo.findById(req.params.id, function(err, demo) {
    if(err) return res.send(500, err.message);
    console.log('GET /demos/' + req.params.id);
    res.status(200).jsonp(demo);
  });
};

//POST - Insert a new register
exports.add = function(req, res) {
  console.log('POST');
  console.log(req.body);
  var demo = new Demo({
    name: req.body.name,
    lastname: req.body.lastname
  });

  demo.save(function(err, demo) {
    if(err) return res.send(500, err.message);
    res.status(200).jsonp(demo);
  });
};

//PUT - Update a register already exists
exports.update = function(req, res) {
  console.log('PUT');
  console.log(req.body);
  Demo.findById(req.params.id, function(err, demo) {
    demo.name = req.body.name;
    demo.lastname = req.body.lastname;
    demo.save(function(err) {
      if(err) return res.send(500, err.message);
      res.status(200).jsonp(demo);
    });
});

};

//DELETE - Delete a register with specified ID
exports.delete = function(req, res) {
  Demo.findById(req.params.id, function(err, demo) {
    demo.remove(function(err) {
      if(err) return res.send(500, err.message);
      res.json({ message: 'Successfully deleted' });
    });
 });
};

exports.help = function help(req, res, next) {
  var help = [
    {
      'method':'GET',
      'url':'localhost:3000/api/demos',
      'desc':'Returns this help'
    },
    {
      'method':'POST',
      'url':'localhost:3000/api/demos',
      'desc':'Create new item',
      'values': {
        'name':'Juan',
        'lastname':'Viola'
      }
    },
    {
      'method':'DELETE',
      'url':'localhost:3000/api/demos/5813b7e445e7110000000001',
      'desc':'Delete an item by id',
    },
    {
      'method':'GET',
      'url':'localhost:3000/api/demos/<id>',
      'desc':'Returns the id number on the url'
    },
    {
      'method':'PUT',
      'url':'localhost:3000/api/demos/<id>',
      'desc':'Update data for the id: <id>',
      'values': {
        'name':'John',
        'lastname':'Doe'
      }
    }
  ]
  res.send(help);
}

