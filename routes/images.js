var express =  require('express');
var imageRouter = express.Router();
var controllers = require('./../controllers/imagesCtrl');





imageRouter.route('/').post(controllers.fileupload);


module.exports = imageRouter;