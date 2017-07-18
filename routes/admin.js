var express =  require('express');
var adminRouter = express.Router();
var controllers = require('./../controllers/adminCtrl');



adminRouter.route('/login')

.post(controllers.login);

adminRouter.route('/addadmin')

.post(controllers.addadmin);





module.exports = adminRouter;