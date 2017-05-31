var User = require('./../models/userModel');


var get = function (req, res) {

    User.find(function (err, data) {
        if (err) {
            res.status(500);
            res.send("Database Error");
        }
        else {
            res.status = 200;
            res.send(data);

        }
    });


};


var getbyid = function (req, res) {

    User.find({ "authId": req.params.id }, function (err, data) {
        if (err) {
            res.status(500);
            res.send("Cannot find by Id");
        }
        else {
            res.status = 200;
            res.send(data);

        }
    });


}

var update = function (req, res) {
    User.find({ "authId": req.params.id }, function (err, data) {
        if (err) {
            res.status(500);
            res.send("Cannot find by Id");
        }
        else {
            console.log(data[0]._id);
            User.findById(data[0]._id, function (err, data) {
                if (err || data ==null) {
                    res.status(500);
                    res.send("Cannot find by Id");
                  }
                else {
                    console.log(data);
                    data.title = req.body.title;
                    data.firstname = req.body.firstname;
                    data.lastname = req.body.lastname;
                    data.dob = req.body.dob;
                    data.gender = req.body.gender;
                    data.mobile = req.body.mobile;

                    data.save(function (err) {
                        if (err) {
                            res.status(500);
                            res.send("Cannot Update");
                        }
                        else {
                            res.status(200);
                            res.send(data);
                        }
                    })

                }


            })








        }
    });


}


var add = function (req, res) {
    console.log("Adding user");
    //console.log(req.body);
    var user = new User(req.body);
    user.save(function (err) {
        if (err) {
            res.status(500);
            res.send("Error Adding User");
        }
        else {
            res.status = 200;
            res.send(user);

        }
    });

}


module.exports = {
    get: get,
    add: add,
    getbyid: getbyid,
    update: update
};