var express =  require('express');
var dropRouter = express.Router();
var controllers = require('./../controllers/dropCtrl');

dropRouter.route('/')

.post(controllers.add);

dropRouter.route('/pool')

.post(controllers.addtopool);

dropRouter.route('/:id/:id2')
.get(controllers.get);

dropRouter.route('/redeemed/:id/:id2')
.get(controllers.getredeemed);

dropRouter.route('/redeem/:userid/:retailerid/:drops')
.get(controllers.redeem);

dropRouter.route('/get/users/:id')
.get(controllers.getusersbyretailerId);





module.exports = dropRouter;