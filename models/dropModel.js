var mongoose = require('mongoose');
var schema = mongoose.Schema;

var dropModel = new schema({

    userid:String,
    retailerid:String,
    dropdate:String,
    redeemed:{type:Boolean, default:false}

})

module.exports = mongoose.model('drops',dropModel);