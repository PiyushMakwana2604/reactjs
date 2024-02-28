const express = require('express')
const router = express.Router()
const userController = require('../controller/user_controllers');

router.post('/register', userController.register);

router.post('/login', userController.login);

router.post('/signup', userController.signup);

router.post('/active_inactive_user', userController.active_inactive_user);

router.get('/userDetails', userController.getuserDetails);


module.exports = router;