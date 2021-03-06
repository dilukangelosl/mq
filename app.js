var express = require('express');
var app = express();
var cors = require('cors')
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var https = require('https');
//routes
var userRouter = require('./routes/users');
var imageRouter = require('./routes/images');
var retailerRoute = require('./routes/retailer');
var qrRoute = require('./routes/qr');
var dropRoute = require('./routes/drop');
var adminRoute = require('./routes/admin');
var fs = require('fs');
//connect to db
var db = mongoose.connect("mongodb://localhost/quench");

//ssl

var sslOptions = {
  cert: fs.readFileSync('./ssl/fullchain.pem'),
    key: fs.readFileSync('./ssl/privkey.pem')
  
  
};


app.use(express.static('static'));
//app uses
app.use(cors())
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/quenchloyalty.com', express.static(__dirname + '/quenchloyalty.com'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.listen(8080, function(){
    console.log("server is running on 8080");
})




app.use('/users', userRouter);
app.use('/images', imageRouter);
app.use('/retailers', retailerRoute);
app.use('/qr',qrRoute);
app.use('/drops',dropRoute);
app.use('/admin',adminRoute);
https.createServer(sslOptions, app).listen(8443, function(){
 console.log("server is running on secured port 8443");

})

