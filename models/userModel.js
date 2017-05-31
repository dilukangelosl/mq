var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userModel = new schema({

    authId:String,
    title:String,
    firstname:String,
    lastname:String,
    dob:String,
    gender:String,
    email:String,
    mobile:String,
    active:{type:Boolean, default:false}

})

module.exports = mongoose.model('Users',userModel);