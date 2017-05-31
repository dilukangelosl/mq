
var multer  = require('multer');
var crypto = require('crypto');
var mime = require('mime');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
});

var upload = multer({ storage: storage }).single('file');

var fileupload = function (req, res) {

upload(req, res, function (err) {
    if (err) {
       res.status = 500;
        res.send({});
    }

    res.status = 200;
   res.send(req.file);
  })


    


};


module.exports = {
    fileupload: fileupload
    
};