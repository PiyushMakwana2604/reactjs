const express = require('express')
const router = express.Router()
const homeController = require('../controller/home_controllers');

router.post('/deleteUser', homeController.deleteUser);

router.post('/searchUser', homeController.searchUser);

router.post('/getuserdata', homeController.getuserdata);

router.post('/updateUserData', homeController.updateUserData);

router.post('/upload_profileImage', homeController.upload_profileImage);

router.post('/add_restaurant', homeController.add_restaurant);

router.post('/edit_restaurant', homeController.edit_restaurant);

router.post('/delete_restaurant', homeController.delete_restaurant);

router.post('/delete_menu', homeController.delete_menu);

router.post('/restaurant_list', homeController.restaurant_list);

router.post('/get_restaurant_data', homeController.get_restaurant_data);


module.exports = router;