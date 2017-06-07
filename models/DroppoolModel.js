var mongoose = require('mongoose');
var schema = mongoose.Schema;

var dropPoolModel = new schema({

    userid:String,
    retailerid:String,
    redeemeddate:String,
    drops:String

})

module.exports = mongoose.model('pool',dropPoolModel);