var express = require('express');
var app = express();
var cors = require('cors')
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
//routes
var userRouter = require('./routes/users');
var imageRouter = require('./routes/images');
var retailerRoute = require('./routes/retailer');

//connect to db
var db = mongoose.connect("mongodb://localhost/quench");

//app uses
app.use(cors())
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(3000, function(){
    console.log("server is running on 3000");
})


app.use('/users', userRouter);
app.use('/images', imageRouter);
app.use('/retailers', retailerRoute);