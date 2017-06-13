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

    Drops.find({ "retailerid": req.params.id, "redeemed": false }, function (err, data) {
        var newdata = [];
        console.log("fiding users for " + req.params.id);
        if (err) {
            res.status(500);
            res.send("Cannot find by Id");
        }
        else {

            console.log("Length of this is reques " + data.length);
            var counter = {};
            for (var i = 0; i < data.length; i += 1) {
                counter[data[i].userid] = (counter[data[i].userid] || 0) + 1;
            }


                var objlength = Object.keys(counter).length;
                var c = 1 ;
            for (var key in counter) {
                
                if (counter[key] > 1) {
                           
                    User.find({ "authId": key }, function (err, data) {
                        if (err) {
                    
                        }
                        else {
                            newdata.push({userid:key,name: data[0].firstname+ " " + data[0].lastname,drops:counter[key]})
                            if(objlength == c){
                                res.status = 200;
                                res.send(newdata);
                            }else{
                                c++;
                            }
                        }
                    });






                        
                    console.log("we have ", key, " duplicated ", counter[key], " times");
                }


            }

                 
           

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