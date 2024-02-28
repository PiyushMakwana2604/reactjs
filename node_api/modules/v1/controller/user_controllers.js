const common = require("../../../config/common");
const user_model = require("../models/user_model");
const logger = require("../../../logger");
const Codes = require("../../../config/status_codes");
const { log } = require("winston");
const { request } = require("express");

exports.register = async (req, res) => {
    let request = await common.decryption(req);
    let rules = {
        first_name: "required",
        last_name: "required",
        dob: "required",
        mobile: "required|digits_between:10,14",
        email: "required|email",
        password: "required",
        country_code: "required",
        front_id_proof: "required",
        back_id_proof: "required",
        id_prooof_type: "required|in:adhar card,passport,licence"
    }
    let valid = await common.checkValidationRules(request, rules)
    if (valid.status) {
        return user_model.register(request, res)
    }
    else {
        logger.error(valid.error)
        return common.sendResponse(res, Codes.VALIDATION_ERROR, valid.error, null);
    }
};

exports.signup = async (req, res) => {
    // let request = await common.decryption(req);
    // console.log(request);
    let request = req.body

    let rules = {
        username: "required",
        email: "required|email",
        mobile: "required",
        gender: "required",
        password: "required",
        age: "required"
    }
    let valid = await common.checkValidationRules(request, rules)
    if (valid.status) {
        return user_model.signup(request, req.language, res)
    }
    else {
        logger.error(valid.error)
        return common.sendResponse(res, Codes.VALIDATION_ERROR, valid.error, null);
    }
};

exports.login = async (req, res) => {
    // let request = await common.decryption(req);
    let request = req.body
    let rules = {
        email: "required",
        password: "required"
    }
    let valid = await common.checkValidationRules(request, rules)
    if (valid.status) {
        return user_model.login(request, req.language, res)
    }
    else {
        logger.error(valid.error)
        return common.sendResponse(res, Codes.VALIDATION_ERROR, valid.error, null);
    }
};

exports.active_inactive_user = async (req, res) => {
    // let request = await common.decryption(req);
    let request = req.body
    request.language = req.language
    let rules = {
        user_id: "required",
    }
    let valid = await common.checkValidationRules(request, rules)
    if (valid.status) {
        return user_model.active_inactive_user(request, res)
    }
    else {
        logger.error(valid.error)
        return common.sendResponse(res, Codes.VALIDATION_ERROR, valid.error, null);
    }
};


exports.getuserProfile = async (req, res) => {
    return user_model.getuserProfile(req, res)
};

exports.getuserDetails = async (req, res) => {
    return user_model.getuserDetails(req, res)
};

