var mongoose = require('mongoose');
var schema = mongoose.Schema;

var adminModel = new schema({

    username:String,
    password:String

})

module.exports = mongoose.model('admin',adminModel);