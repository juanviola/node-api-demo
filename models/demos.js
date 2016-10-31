var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var demoSchema = new Schema({
 name: { type: String },
 lastname: { type: String }
});

module.exports = mongoose.model('Demo', demoSchema);
