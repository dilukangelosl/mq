var Drops = require('./../models/dropModel');
var Pool = require('./../models/DroppoolModel');
var User = require('./../models/userModel');

var get = function (req, res) {

    Drops.find({ "userid": req.params.id, "retailerid": req.params.id2, "redeemed": false }, function (err, data) {
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


var getusersbyretailerId = function (req, res) {

    Drop.find({ "retailerid": req.params.id, "redeemed": false }, function (err, data) {
        //needed var 
        var newdata = [];
        var startingcounter = 0;
        var counter = {};
        if (err) {
            res.status(500);
            res.send("Cannot find by Id");
        }

        else {


            for (var i = 0; i < data.length; i += 1) {
                counter[data[i].userid] = (counter[data[i].userid] || 0) + 1;

                if (i == data.length - 1) {

                    //do rest 
                    var objlength = Object.keys(counter).length;

                    finduseranddotherest(objlength);

                }
            }

        }

        //nested functions

        function finduseranddotherest(countersize) {
            var keyoftheobject = Object.keys(counter)[startingcounter];
            console.log("user Key  == " + keyoftheobject + " keydata ==" + counter[keyoftheobject]);

            User.find({ "authId": keyoftheobject }, function (err, data) {

                if (err) {
                    res.status = 200;
                    res.send(err);
                }
                else {
                    newdata.push({ userid: key, name: data[0].firstname + " " + data[0].lastname, dob: data[0].dob, gender: data[0].gender, email: data[0].email, drops: counter[keyoftheobject] })
                    if (startingcounter == countersize) {

                        res.status = 200;
                        res.send(newdata);

                    } else {
                        console.log("we have " + keyoftheobject + " duplicated " + counter[keyoftheobject] + " times");
                        startingcounter++;
                        finduseranddotherest(countersize);
                    }
                }

            });

        }

    });



}


var getredeemed = function (req, res) {

    Pool.find({ "userid": req.params.id, "retailerid": req.params.id2 }, function (err, data) {
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



var getbyuserid = function (req, res) {

    Drops.find({ "userid": req.params.id }, function (err, data) {
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

var getbyretailerid = function (req, res) {
    console.log("get by retailer id");
    Drops.find({ "retailerid": req.params.id }, function (err, data) {
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



var redeem = function (req, res) {
    //number of drops to redeem
    var drops = req.params.drops;
    var userid = req.params.userid;
    var retailerid = req.params.retailerid;

    console.log("Redeeming " + drops + " Drops");

    Drops.find({ "redeemed": false, "userid": userid, "retailerid": retailerid })
        .sort({ 'dropdate': -1 })
        .limit(parseInt(drops))
        .exec(function (err, data) {
            var updated = [];
            if (err) {
                res.status(500);
                res.send(err);
            }
            else {
                var counter = 0;
                data.forEach(function (e) {

                    Drops.find(e).update({ "redeemed": true }).exec(function (err, d) {

                        if (err) {

                        } else {
                            counter++;
                            updated.push(e);
                            if (counter === data.length) {

                                var pool = new Pool({ "userid": userid, "retailerid": retailerid, "redeemeddate": "", "drops": drops });
                                pool.save(function (err, de) {

                                    if (err) {
                                        res.status = 500;
                                        res.send([]);
                                    }
                                    else {
                                        res.status = 200;
                                        res.send(updated);
                                    }

                                })
                            }

                        }

                    })

                })


            }
        })




}






var add = function (req, res) {
    console.log("Adding Drop");
    //console.log(req.body);
    var drop = new Drops(req.body);
    drop.save(function (err) {
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


var addtopool = function (req, res) {
    console.log("Adding to Drop Pool");
    //console.log(req.body);
    var pool = new Pool(req.body);
    drop.save(function (err) {
        if (err) {
            res.status(500);
            res.send("Error Adding to Pool");
        }
        else {
            res.status = 200;
            res.send(drop);

        }
    });

}


module.exports = {
    get: get,
    add: add,
    addtopool: addtopool,
    getbyretailerid: getbyretailerid,
    getbyuserid: getbyuserid,
    redeem: redeem,
    getredeemed: getredeemed,
    getusersbyretailerId: getusersbyretailerId
};
