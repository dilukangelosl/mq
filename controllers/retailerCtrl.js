var Retailer = require('./../models/retailersModel');


var get = function (req, res) {

    Retailer.find(function (err, data) {
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

    Retailer.find({ "authId": req.params.id }, function (err, data) {
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
    Retailer.find({ "authId": req.params.id }, function (err, data) {
        if (err) {
            res.status(500);
            res.send("Cannot find by Id");
        }
        else {
            console.log(data[0]._id);
            Retailer.findById(data[0]._id, function (err, data) {
                if (err || data == null) {
                    res.status(500);
                    res.send("Cannot find by Id");
                }
                else {

                    data.fullname = req.body.fullname;
                    data.displayname = req.body.displayname;
                    data.image = req.body.image;


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

var deleteretailer = function(req,res){
console.log("removing " + req.body.id)
Retailer.findById(req.body.id , function(err,retailer){
    retailer.remove();
});
res.status(200);
res.send("Done : " + req.body.id);
}


var add = function (req, res) {
    console.log("Adding user");
    //console.log(req.body);

    if(req.body["authId"] == null || req.body["authId"] == ""){
            res.status(500);
            res.send("Error Adding User");

    }
    else{
 var retailer = new Retailer(req.body);
    retailer.save(function (err) {
        if (err) {
            res.status(500);
            res.send("Error Adding User");
        }
        else {
            res.status = 200;
            res.send(retailer);

        }
    });
    }

   

}


module.exports = {
    get: get,
    add: add,
    getbyid: getbyid,
    update: update,
    remove:deleteretailer
};