var Admin = require('./../models/adminModel');


var login = function (req, res) {

    Admin.find({ "username": req.body.username, "password": req.body.password }, function (err, data) {
        if (err) {
            res.status(500);
            res.send("Login Failed");
        }
        else {


            res.status = 200;
            res.send(data);

        }
    });


}



var addadmin = function (req, res) {
    console.log("Adding admin");
    //console.log(req.body);
    var admin = new Admin(req.body);
    admin.save(function (err) {
        if (err) {
            res.status(500);
            res.send("Error Adding Drop");
        }
        else {
            res.status = 200;
            res.send(drop);

        }
    });

}





module.exports = {
    login: login,
    addadmin: addadmin
};
