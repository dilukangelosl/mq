var mongoose = require('mongoose');
var schema = mongoose.Schema;

var retailersModel = new schema({

    authId:String,
    fullname:String,
    displayname:String,
    image:String,
    email:String,
    active:{type:Boolean, default:false},
    businesstype:String,
    locationstreet:String,
    locationtown:String

})

module.exports = mongoose.model('Retailers',retailersModel);