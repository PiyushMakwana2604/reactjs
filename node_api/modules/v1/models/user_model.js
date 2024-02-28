const dbConn = require("../../../config/database");
const common = require("../../../config/common");
const lang = require("../../../config/language");
const emailTemplate = require("../../../config/template")
const logger = require("../../../logger");
const Codes = require("../../../config/status_codes");
const moment = require("moment");

let user_model = {

    //function for Register user
    async register(req, res) {
        try {
            const checkUniqueEmail = await common.checkUniqueEmail(req)
            const checkUniqueMobile = await common.checkUniqueMobile(req)
            if (!checkUniqueEmail) {
                return await common.sendResponse(res, Codes.NOT_FOUND, lang[req.language]['text_user_duplicate_email'], null)
            }
            if (!checkUniqueMobile) {
                return await common.sendResponse(res, Codes.NOT_FOUND, lang[req.language]['text_user_duplicate_mobile'], null)
            }
            let user = {
                first_name: req.first_name,
                last_name: req.last_name,
                dob: req.dob,
                mobile: req.mobile,
                email: req.email,
                password: common.encryptPlain(parseInt(req.password)),
                front_id_proof: req.front_id_proof,
                back_id_proof: req.back_id_proof,
                country_code: req.country_code,
                id_prooof_type: (req.id_prooof_type != undefined) ? req.id_prooof_type : "adhar card",
                otp_code: (req.otp_code != undefined) ? req.otp_code : "",
                mobile_verify: (req.mobile_verify != undefined) ? req.mobile_verify : "pending"
            };
            let OTP = Math.floor(1000 + Math.random() * 9000);
            user.otp_code = OTP;
            const [rows, fields] = await dbConn.query(`INSERT INTO tbl_user SET ?`, user);
            if (rows.affectedRows != 0) {
                req.user_id = rows.insertId
                let checkDeviceInfo = await common.checkDeviceInfo(req);
                let userprofile = await user_model.userDetails(req.user_id);
                checkDeviceInfo.token = userprofile.token;
                return await common.sendResponse(res, Codes.SUCCESS, lang[req.language]['text_user_register_succ'], userprofile)
            }
        }
        catch (error) {
            logger.error(error)
            return await common.sendResponse(res, Codes.INTERNAL_ERROR, lang[req.language]['text_user_something_wrong'], error);
        }
    },

    async signup(req, language, res) {
        try {
            const checkUniqueEmail = await common.checkUniqueEmail(req)
            // const checkUniqueMobile = await common.checkUniqueMobile(req)
            if (!checkUniqueEmail) {
                return await common.sendResponse(res, Codes.NOT_FOUND, lang[language]['text_user_duplicate_email'], null)
            }
            // if (!checkUniqueMobile) {
            //     return await common.sendResponse(res, Codes.NOT_FOUND, lang[language]['text_user_duplicate_mobile'], null)
            // }
            let user = {
                username: req.username,
                email: req.email,
                gender: req.gender,
                mobile: req.mobile,
                password: common.encryptPlain(req.password),
                age: req.age,
            };
            // let OTP = Math.floor(1000 + Math.random() * 9000);
            // user.otp_code = OTP;
            const [rows, fields] = await dbConn.query(`INSERT INTO tbl_user SET ?`, user);
            if (rows.affectedRows != 0) {
                req.user_id = rows.insertId
                const [userprofile] = await dbConn.query(`SELECT * FROM tbl_user WHERE id = ${req.user_id}`);
                // let userprofile = await user_model.userDetails(req.user_id);
                return await common.sendResponse(res, Codes.SUCCESS, lang[language]['text_user_register_succ'], userprofile)
            }
            return await common.sendResponse(res, Codes.NOT_FOUND, lang[language]['text_user_something_wrong'], null);
        }
        catch (error) {
            logger.error(error)
            return await common.sendResponse(res, Codes.INTERNAL_ERROR, lang[language]['text_user_something_wrong'], error);
        }
    },

    //function for Login user
    async login(req, language, res) {
        try {
            const [rows, fields] = await dbConn.query("SELECT * FROM tbl_user WHERE email = '" + req.email + "' AND is_delete = 0 ");
            if (rows.length <= 0) {
                return await common.sendResponse(res, Codes.NOT_FOUND, lang[language]['text_user_invalid_login_details'], null);
            }
            if (rows[0].is_active != 1) {
                return await common.sendResponse(res, Codes.INACTIVE, lang[language]['text_user_account_inactive'], null)
            }
            let password = rows[0].password;
            let encPassword = await common.encryptPlain(req.password);
            if (password === encPassword) {
                return await common.sendResponse(res, Codes.SUCCESS, lang[language]['text_user_login_succ'], rows);
            }
            else {
                return await common.sendResponse(res, Codes.NOT_FOUND, lang[language]['text_user_incorrect_password'], null);
            }
        }
        catch (error) {
            logger.error(error)
            return await common.sendResponse(res, Codes.INTERNAL_ERROR, lang[language]['text_user_something_wrong'], null);
        }
    },

    //function for get user details
    async userDetails(req) {
        try {
            // const [rows, fields] = await dbConn.query("SELECT u.*,ut.device_token as device_token,ut.device_type as device_type,ut.token as token FROM tbl_user u LEFT JOIN tbl_user_device as ut ON u.id = ut.user_id WHERE u.id = '" + req + "' AND u.is_active='1' AND u.is_deleted='0' GROUP BY u.id order by u.id desc");
            const [rows, fields] = await dbConn.query("SELECT * FROM tbl_user WHERE is_active = 1 and is_delete = 0");
            if (rows.length > 0) {
                return rows;
            }
            else {
                return false;
            }
        } catch (error) {
            logger.error(error)
            return await common.sendResponse(res, Codes.INTERNAL_ERROR, lang[req.language]['text_user_something_wrong'], error);
        }
    },
    async getuserDetails(req, res) {
        try {
            // const [rows, fields] = await dbConn.query("SELECT u.*,ut.device_token as device_token,ut.device_type as device_type,ut.token as token FROM tbl_user u LEFT JOIN tbl_user_device as ut ON u.id = ut.user_id WHERE u.id = '" + req + "' AND u.is_active='1' AND u.is_deleted='0' GROUP BY u.id order by u.id desc");
            const [rows, fields] = await dbConn.query("SELECT * FROM tbl_user WHERE is_delete = 0");
            if (rows.length > 0) {
                return await common.sendResponse(res, Codes.SUCCESS, lang[req.language]['text_get_usedetails'], rows);
            }
            else {
                return await common.sendResponse(res, Codes.NOT_FOUND, lang[req.language]['text_home_user_not_found'], null);
            }
        } catch (error) {
            logger.error(error)
            return await common.sendResponse(res, Codes.INTERNAL_ERROR, lang[req.language]['text_user_something_wrong'], error);
        }
    },

    //function for update user details
    async updateUserDetails(req, user_id) {
        try {
            const [rows, fields] = await dbConn.query(`UPDATE tbl_user SET ? WHERE id = ${user_id} `, req);
            if (rows.affectedRows != 0) {
                return await user_model.userDetails(user_id)
            }
        } catch (error) {
            return await common.sendResponse(res, Codes.INTERNAL_ERROR, lang[req.language]['text_user_something_wrong'], error);
        }

    },

    //function for get profile
    async getuserProfile(req, res) {
        try {
            let userprofile = await user_model.userDetails(req.user_id)
            return await common.sendResponse(res, Codes.SUCCESS, lang[req.language]['text_user_get_user_profile'], userprofile[0]);

        } catch (error) {
            logger.error(error)
        }
    },
    async active_inactive_user(req, res) {
        try {
            // const [rows, fields] = await dbConn.query("SELECT u.*,ut.device_token as device_token,ut.device_type as device_type,ut.token as token FROM tbl_user u LEFT JOIN tbl_user_device as ut ON u.id = ut.user_id WHERE u.id = '" + req + "' AND u.is_active='1' AND u.is_deleted='0' GROUP BY u.id order by u.id desc");
            const [rows, fields] = await dbConn.query("SELECT * FROM tbl_user WHERE id = " + req.user_id + " AND is_delete = 0");
            if (rows.length <= 0) {
                return await common.sendResponse(res, Codes.NOT_FOUND, lang[req.language]['text_home_user_not_found'], null);
            }
            let is_active = rows[0].is_active;
            if (is_active == 0) {
                is_active = 1;
            } else {
                is_active = 0;
            }
            const [update, field] = await dbConn.query(`UPDATE tbl_user SET is_active =${is_active}  WHERE id = ${req.user_id} `, req);
            if (update.affectedRows != 0) {
                return await common.sendResponse(res, Codes.SUCCESS, lang[req.language]['text_user_update_active_status_succ'], null);
            }
            return await common.sendResponse(res, Codes.NOT_FOUND, lang[req.language]['text_user_update_active_status_err'], null);
        } catch (error) {
            logger.error(error)
            return await common.sendResponse(res, Codes.INTERNAL_ERROR, lang[req.language]['text_user_something_wrong'], error);
        }
    },
}

module.exports = user_model;