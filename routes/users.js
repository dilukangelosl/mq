var express =  require('express');
var userRouter = express.Router();
var controllers = require('./../controllers/usersCtrl');

userRouter.route('/')
.get(controllers.get)
.post(controllers.add);

userRouter.route('/:id')
.get(controllers.getbyid)
.post(controllers.update);


module.exports = userRouter;