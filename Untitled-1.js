


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
        console.log("user Key  == " + keyoftheobject + " keydata ==" counter[keyoftheobject]);

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



//old code 

  Drops.find({ "retailerid": req.params.id, "redeemed": false }, function (err, data) {
        var newdata = [];
       // console.log(data);
        //console.log("fiding users for " + req.params.id);
        if (err) {
            res.status(500);
            res.send("Cannot find by Id");
        }
        else {

            // console.log("Length of this is reques " + data.length);
            var counter = {};
            for (var i = 0; i < data.length; i += 1) {
                counter[data[i].userid] = (counter[data[i].userid] || 0) + 1;

                //after for loop is over 

                if (i == data.length - 1) {
                    //do rest 

                    var objlength = Object.keys(counter).length;
                    var c = 1;
                    //console.log(counter);

                    for (var key in counter) {
                        //console.log("counter = " + key);
                        var dropcountnew = counter[key];

                        if (counter[key] > 0) {

                           // console.log("drop count === " + dropcountnew);

                            User.find({ "authId": key }, function (err, data) {
                                if (err) {
                                    res.status = 200;
                                    res.send(err);
                                }
                                else {

                                    newdata.push({ userid: key, name: data[0].firstname + " " + data[0].lastname, dob: data[0].dob, gender: data[0].gender, email: data[0].email, drops: dropcountnew })
                                    console.log(objlength + " == " + c);
                                    if (objlength == c) {
                                        res.status = 200;
                                        res.send(newdata);
                                    } else {
                                        console.log("incrementing counter");
                                        c++;
                                    }

                                }
                            });

                            console.log("we have ", key, " duplicated ", counter[key], " times");
                        }


                    }

                    //end do rest
                }


            }









        }
    });