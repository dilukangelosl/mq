var express =  require('express');
var retailerRoute = express.Router();
var controllers = require('./../controllers/retailerCtrl');

retailerRoute.route('/')
.get(controllers.get)
.post(controllers.add);

retailerRoute.route('/:id')
.get(controllers.getbyid)
.post(controllers.update);

retailerRoute.route('/remove/retailer/admin')

.post(controllers.remove);


module.exports = retailerRoute;