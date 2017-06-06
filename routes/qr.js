var express =  require('express');
var qrRouter = express.Router();
var controllers = require('./../controllers/qrCtrl');



qrRouter.route('/:data')
.get(controllers.makeqr)



module.exports = qrRouter;