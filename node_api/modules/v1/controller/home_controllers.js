const common = require("../../../config/common");
const home_model = require("../models/home_model");
const logger = require("../../../logger");
const Codes = require("../../../config/status_codes");
const { log } = require("winston");
const { request } = require("express");
var multer = require("multer");
var path = require("path");
const lang = require("../../../config/language");

exports.deleteUser = async (req, res) => {
    // let request = await common.decryption(req);
    let request = req.body
    request.language = req.language
    let rules = {
        user_id: "required"
    }
    let valid = await common.checkValidationRules(request, rules)
    if (valid.status) {
        return home_model.deleteUser(request, res)
    }
    else {
        logger.error(valid.error)
        return common.sendResponse(res, Codes.VALIDATION_ERROR, valid.error, null);
    }
};

exports.searchUser = async (req, res) => {
    // let request = await common.decryption(req);
    let request = req.body
    request.language = req.language
    // let rules = {
    //     search: "required"
    // }
    // let valid = await common.checkValidationRules(request, rules)
    // if (valid.status) {
    return home_model.searchUser(request, res)
    // }
    // else {
    //     logger.error(valid.error)
    //     return common.sendResponse(res, Codes.VALIDATION_ERROR, valid.error, null);
    // }
};
exports.getuserdata = async (req, res) => {
    // let request = await common.decryption(req);
    let request = req.body
    request.language = req.language
    let rules = {
        user_id: "required"
    }
    let valid = await common.checkValidationRules(request, rules)
    if (valid.status) {
        return home_model.getuserdata(request, res)
    }
    else {
        logger.error(valid.error)
        return common.sendResponse(res, Codes.VALIDATION_ERROR, valid.error, null);
    }
};
exports.updateUserData = async (req, res) => {
    // let request = await common.decryption(req);
    let request = req.body
    request.language = req.language
    let rules = {
        user_id: "required",
        username: "required",
        email: "required",
        mobile: "required",
        gender: "required",
        age: "required",
    }
    let valid = await common.checkValidationRules(request, rules)
    if (valid.status) {
        return home_model.updateUserData(request, res)
    }
    else {
        logger.error(valid.error)
        return common.sendResponse(res, Codes.VALIDATION_ERROR, valid.error, null);
    }
};
exports.upload_profileImage = async (req, res) => {
    let image_name = '';
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            // cb(null, '../public/assets/profile_image/')
            // Node Public Folder Path
            cb(null, '../node_api/public/profile_img/')
        },
        filename: function (req, file, cb) {
            //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            //   cb(null, file.fieldname + '-' + uniqueSuffix)
            // console.log(Date.now(),path.extname(file.originalname));
            image_name = Date.now() + path.extname(file.originalname);
            cb(null, image_name)
        }
    });
    const updimg = multer({
        storage: storage,
        limits: {
            fileSize: (4 * 1024 * 1024)
        }
    }).single("profile_img");
    // var updmultiimage=updimg.fields([
    //     {
    //         name:'food_image',
    //         maxCount:3
    //     }
    // ]);
    updimg(req, res, function (err) {
        if (err) {
            console.log(err);
            return common.sendResponse(res, Codes.NOT_FOUND, lang[req.language]['text_home_update_userdata_err'], err);
        } else {
            // {image:req.file.filename}
            // console.log(req.files.restaurant_img)
            // req.files.restaurant_img.forEach(element => {
            //     console.log(element);
            // });
            return common.sendResponse(res, Codes.SUCCESS, lang[req.language]['text_home_update_userdata_succ'], { profile_image: image_name });
        }
    })
};
exports.add_restaurant = async (req, res) => {
    // let request = await common.decryption(req);
    let request = req.body
    request.language = req.language
    let rules = {
        restaurant_name: "required",
        restaurant_address: "required",
        product_name: "",
        product_type: "",
        product_category: "",
        product_price: "",
    }
    let valid = await common.checkValidationRules(request, rules)
    if (valid.status) {
        return home_model.add_restaurant(request, res)
    }
    else {
        logger.error(valid.error)
        return common.sendResponse(res, Codes.VALIDATION_ERROR, valid.error, null);
    }
};
exports.edit_restaurant = async (req, res) => {
    // let request = await common.decryption(req);
    let request = req.body
    request.language = req.language
    let rules = {
        restaurant_id: "required",
        restaurant_name: "required",
        restaurant_address: "required",
        menu_id: "",
        product_name: "",
        product_type: "",
        product_category: "",
        product_price: "",
    }
    let valid = await common.checkValidationRules(request, rules)
    if (valid.status) {
        return home_model.edit_restaurant(request, res)
    }
    else {
        logger.error(valid.error)
        return common.sendResponse(res, Codes.VALIDATION_ERROR, valid.error, null);
    }
};
exports.delete_restaurant = async (req, res) => {
    let request = req.body
    request.language = req.language
    let rules = {
        restaurant_id: "required",
    }
    let valid = await common.checkValidationRules(request, rules)
    if (valid.status) {
        return home_model.delete_restaurant(request, res)
    }
    else {
        logger.error(valid.error)
        return common.sendResponse(res, Codes.VALIDATION_ERROR, valid.error, null);
    }
};
exports.delete_menu = async (req, res) => {
    let request = req.body
    request.language = req.language
    let rules = {
        menu_id: "required",
    }
    let valid = await common.checkValidationRules(request, rules)
    if (valid.status) {
        return home_model.delete_menu(request, res)
    }
    else {
        logger.error(valid.error)
        return common.sendResponse(res, Codes.VALIDATION_ERROR, valid.error, null);
    }
};
exports.restaurant_list = async (req, res) => {
    let request = req.body
    request.language = req.language
    return home_model.restaurant_list(request, res)
};
exports.get_restaurant_data = async (req, res) => {
    // let request = await common.decryption(req);
    let request = req.body
    request.language = req.language
    let rules = {
        restaurant_id: "required"
    }
    let valid = await common.checkValidationRules(request, rules)
    if (valid.status) {
        return home_model.get_restaurant_data(request, res)
    }
    else {
        logger.error(valid.error)
        return common.sendResponse(res, Codes.VALIDATION_ERROR, valid.error, null);
    }
};
