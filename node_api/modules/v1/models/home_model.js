const dbConn = require("../../../config/database");
const common = require("../../../config/common");
const lang = require("../../../config/language");
const emailTemplate = require("../../../config/template")
const logger = require("../../../logger");
const Codes = require("../../../config/status_codes");
const { request } = require("express");

let home_model = {
    async deleteUser(req, res) {
        try {
            const [rows, fields] = await dbConn.query("SELECT * FROM tbl_user WHERE id = '" + req.user_id + "'  AND is_delete = 0 ");
            if (rows.length <= 0) {
                return await common.sendResponse(res, Codes.NOT_FOUND, lang[req.language]['text_user_invalid_login_details'], null);
            }
            const [updatedata, field] = await dbConn.query(`UPDATE tbl_user SET is_delete = 1 WHERE id = ${req.user_id}`);
            if (updatedata.affectedRows != 0) {
                return await common.sendResponse(res, Codes.SUCCESS, lang[req.language]['text_home_delete_user_succ'], null);
            }
            return await common.sendResponse(res, Codes.NOT_FOUND, lang[language]['text_user_something_wrong'], null);
        }
        catch (error) {
            logger.error(error)
            return await common.sendResponse(res, Codes.INTERNAL_ERROR, lang[req.language]['text_user_something_wrong'], null);
        }
    },
    async searchUser(req, res) {
        try {
            var where = ``;
            if (req.search && req.search.length > 0) {
                const searchConditions = req.search.map(searchTerm => {
                    return `(LOWER(username) LIKE '%${searchTerm}%' OR LOWER(gender) LIKE '%${searchTerm}%' OR LOWER(email) LIKE '%${searchTerm}%' OR LOWER(mobile) LIKE '%${searchTerm}%')`;
                });

                where += `AND (${searchConditions.join(' AND ')}) `;

                // where += `AND (LOWER(username) LIKE ('%${req.search}%') OR LOWER(gender) LIKE ('%${req.search}%')) `;
                // console.log(where);
            }
            const [rows, fields] = await dbConn.query("SELECT * FROM tbl_user WHERE is_active = 1  AND is_delete = 0 " + where);
            if (rows.length <= 0) {
                return await common.sendResponse(res, Codes.NOT_FOUND, lang[req.language]['text_home_no_data_found'], null);
            }
            return await common.sendResponse(res, Codes.SUCCESS, lang[req.language]['text_home_get_data'], rows);
        }
        catch (error) {
            logger.error(error)
            return await common.sendResponse(res, Codes.INTERNAL_ERROR, lang[req.language]['text_user_something_wrong'], null);
        }
    },
    async getuserdata(req, res) {
        try {
            const [rows, fields] = await dbConn.query("SELECT * FROM tbl_user WHERE id= " + req.user_id + "  AND is_delete = 0 ");
            if (rows.length <= 0) {
                return await common.sendResponse(res, Codes.NOT_FOUND, lang[req.language]['text_home_no_data_found'], null);
            }
            return await common.sendResponse(res, Codes.SUCCESS, lang[req.language]['text_home_get_data'], rows);
        }
        catch (error) {
            logger.error(error)
            return await common.sendResponse(res, Codes.INTERNAL_ERROR, lang[req.language]['text_user_something_wrong'], null);
        }
    },
    async updateUserData(req, res) {
        console.log(req);
        try {
            let userData = {
                username: req.username,
                email: req.email,
                mobile: req.mobile,
                gender: req.gender,
                age: req.age
            }
            if (req.profile_image != undefined && req.profile_image != "") {
                userData.profile_image = req.profile_image
            }
            const [rows, fields] = await dbConn.query("SELECT * FROM tbl_user WHERE id= " + req.user_id + "  AND is_delete = 0 ");
            if (rows.length <= 0) {
                return await common.sendResponse(res, Codes.NOT_FOUND, lang[req.language]['text_home_no_data_found'], null);
            }
            const [update, field] = await dbConn.query(`UPDATE tbl_user SET ? WHERE id = ${req.user_id} `, userData);
            if (update.affectedRows != 0) {
                let data = await home_model.userDetail(req.user_id)
                return await common.sendResponse(res, Codes.SUCCESS, lang[req.language]['text_home_update_userdata_succ'], data);
            }
            return await common.sendResponse(res, Codes.NOT_FOUND, lang[req.language]['text_home_update_userdata_err'], null);
        }
        catch (error) {
            logger.error(error)
            return await common.sendResponse(res, Codes.INTERNAL_ERROR, lang[req.language]['text_user_something_wrong'], null);
        }
    },
    async add_restaurant(req, res) {
        try {
            let restaurant_data = {
                name: req.restaurant_name,
                address: req.restaurant_address
            }
            let data = {}
            const [rows, fields] = await dbConn.query(`INSERT INTO tbl_restaurant SET ?`, restaurant_data);
            if (rows.affectedRows == 0) {
                return await common.sendResponse(res, Codes.NOT_FOUND, lang[req.language]['text_home_add_restaurant_err'], null);
            }
            let restaurant_id = rows.insertId;
            if (req.product_name.length > 0 && req.product_type.length > 0 && req.product_category.length > 0 && req.product_price.length > 0) {
                let menu_data = {
                    name: req.product_name,
                    price: req.product_price,
                    category: req.product_category,
                    type: req.product_type,
                }
                const values = menu_data.name.map((_, index) => [
                    restaurant_id,
                    menu_data.name[index],
                    menu_data.price[index],
                    menu_data.category[index],
                    menu_data.type[index]
                ]);
                const [menuRows, menuFields] = await dbConn.query(`INSERT INTO tbl_menu (restaurant_id, name, category, price, type) VALUES ?`, [values]);
                if (menuRows.affectedRows == 0) {
                    return await common.sendResponse(res, Codes.NOT_FOUND, lang[req.language]['text_home_add_restaurant_err'], null);
                }
                const [menuData, fields] = await dbConn.query("SELECT * FROM tbl_menu WHERE restaurant_id=" + restaurant_id + " AND is_active = 1 and is_delete = 0");
                data.menu_data = menuData

            }
            const [row] = await dbConn.query("SELECT * FROM tbl_restaurant WHERE id= " + restaurant_id + " AND is_active = 1 AND is_delete = 0 ");
            data.restaurant_data = row

            return await common.sendResponse(res, Codes.SUCCESS, lang[req.language]['text_home_add_restaurant_succ'], data);
        }
        catch (error) {
            logger.error(error)
            return await common.sendResponse(res, Codes.INTERNAL_ERROR, lang[req.language]['text_user_something_wrong'], null);
        }
    },
    async edit_restaurant(req, res) {
        try {
            let restaurant_data = {
                name: req.restaurant_name,
                address: req.restaurant_address
            }
            const [updaterestaurant, field] = await dbConn.query(`UPDATE tbl_restaurant SET ? WHERE id = ${req.restaurant_id}`, restaurant_data);
            let update_menu_count = 0;
            if (req.product_name.length > 0 && req.product_type.length > 0 && req.product_category.length > 0 && req.product_price.length > 0) {
                let menu_data = {
                    restaurant_id: req.restaurant_id,
                    name: req.product_name,
                    price: req.product_price,
                    category: req.product_category,
                    type: req.product_type,
                }
                for (let index = 0; index < req.product_name.length; index++) {
                    const data = {
                        restaurant_id: req.restaurant_id,
                        name: menu_data.name[index],
                        price: menu_data.price[index],
                        category: menu_data.category[index],
                        type: menu_data.type[index],
                    };
                    console.log('req.menu_id[index]: ', req);
                    if (req.menu_id[index] != undefined && req.menu_id[index] != "") {
                        const [updatemenu, field] = await dbConn.query(
                            `UPDATE tbl_menu SET ? WHERE id = ${req.menu_id[index]}`,
                            data
                        );
                        update_menu_count += updatemenu.changedRows
                    } else {
                        const [menuRows] = await dbConn.query(`INSERT INTO tbl_menu SET ?`, [data]);
                        update_menu_count += menuRows.affectedRows
                        if (menuRows.affectedRows == 0) {
                            return await common.sendResponse(res, Codes.NOT_FOUND, lang[req.language]['text_home_add_menu_err'], null);
                        }
                    }
                }
            }
            if (updaterestaurant.changedRows > 0 || update_menu_count > 0) {
                return await common.sendResponse(res, Codes.SUCCESS, lang[req.language]['text_home_edit_restaurant_succ'], null);
            }
            return await common.sendResponse(res, Codes.NOT_FOUND, lang[req.language]['text_home_edit_restaurant_err'], null);
        }
        catch (error) {
            logger.error(error)
            return await common.sendResponse(res, Codes.INTERNAL_ERROR, lang[req.language]['text_user_something_wrong'], null);
        }
    },
    async delete_restaurant(req, res) {
        try {
            const [updaterestaurant, field] = await dbConn.query(`UPDATE tbl_restaurant SET is_delete = 1 WHERE id = ${req.restaurant_id}`);
            if (updaterestaurant.affectedRows != 0) {
                const [updatemenu] = await dbConn.query(`UPDATE tbl_menu SET is_delete = 1 WHERE restaurant_id = ${req.restaurant_id}`);
                return await common.sendResponse(res, Codes.SUCCESS, lang[req.language]['text_home_delete_restaurant_succ'], null);
            }
            return await common.sendResponse(res, Codes.NOT_FOUND, lang[req.language]['text_home_delete_restaurant_err'], null);
            // const [rows, fields] = await dbConn.query("SELECT * FROM tbl_restaurant WHERE is_delete = 0 ");
            // if (rows.length <= 0) {
            // }
            // return await common.sendResponse(res, Codes.SUCCESS, lang[req.language]['text_home_get_data'], rows);
        }
        catch (error) {
            logger.error(error)
            return await common.sendResponse(res, Codes.INTERNAL_ERROR, lang[req.language]['text_user_something_wrong'], null);
        }
    },
    async delete_menu(req, res) {
        try {
            const [updatemenu, field] = await dbConn.query(`UPDATE tbl_menu SET is_delete = 1 WHERE id = ${req.menu_id}`);
            console.log('updatemenu: ', updatemenu);
            if (updatemenu.affectedRows != 0) {
                return await common.sendResponse(res, Codes.SUCCESS, lang[req.language]['text_home_delete_menu_succ'], null);
            }
            return await common.sendResponse(res, Codes.NOT_FOUND, lang[req.language]['text_home_delete_menu_err'], null);
            // const [rows, fields] = await dbConn.query("SELECT * FROM tbl_restaurant WHERE is_delete = 0 ");
            // if (rows.length <= 0) {
            // }
            // return await common.sendResponse(res, Codes.SUCCESS, lang[req.language]['text_home_get_data'], rows);
        }
        catch (error) {
            logger.error(error)
            return await common.sendResponse(res, Codes.INTERNAL_ERROR, lang[req.language]['text_user_something_wrong'], null);
        }
    },
    async restaurant_list(req, res) {
        try {
            var page = req.page
            var perPage = req.perpage
            var offset = (page - 1) * perPage;
            // const [rows, fields] = await dbConn.query("SELECT * FROM tbl_restaurant WHERE is_delete = 0 AND is_active=1");

            let countquery = `SELECT
                count(id) as count
            FROM tbl_restaurant r
            WHERE r.is_delete = 0 AND r.is_active = 1 `

            const [count_restaurant] = await dbConn.query(countquery);

            const [rows, fields] = await dbConn.query(`SELECT
                r.*,
                CONCAT('[', IFNULL(GROUP_CONCAT(
                    CONCAT(
                        '{"id": ', m.id,
                        ',"restaurant_id": ', m.restaurant_id,
                        ',"name": "', m.name,
                        '","price": ', m.price,
                        ',"type": "', m.type,
                        '","category": "', m.category, '"}'
                    )
                    SEPARATOR ','
                ), ''), ']') AS menu_data
            FROM tbl_restaurant r
            LEFT JOIN tbl_menu AS m ON r.id = m.restaurant_id
            WHERE r.is_delete = 0 AND r.is_active = 1 AND (m.is_delete = 0 OR m.is_delete IS NULL) AND (m.is_active = 1 OR m.is_active IS NULL)
            GROUP BY r.id
            LIMIT ${perPage} OFFSET ${offset};`);
            let data = {
                page: parseInt(page),
                total_page_data: rows.length,
                total_data_count: count_restaurant[0].count,
                result: (rows.length != 0) ? rows : [],
            }
            if (rows.length <= 0) {
                return await common.sendResponse(res, Codes.NOT_FOUND, lang[req.language]['text_home_no_data_found'], null);
            }

            return await common.sendResponse(res, Codes.SUCCESS, lang[req.language]['text_home_get_data'], data);
        }
        catch (error) {
            logger.error(error)
            return await common.sendResponse(res, Codes.INTERNAL_ERROR, lang[req.language]['text_user_something_wrong'], null);
        }
    },
    async get_restaurant_data(req, res) {
        try {
            const [rows, fields] = await dbConn.query("SELECT * FROM tbl_restaurant WHERE id = " + req.restaurant_id + " AND is_delete = 0 ");
            if (rows.length <= 0) {
                return await common.sendResponse(res, Codes.NOT_FOUND, lang[req.language]['text_home_no_data_found'], null);
            }
            const [menu] = await dbConn.query("SELECT * FROM tbl_menu WHERE restaurant_id = " + req.restaurant_id + " AND is_delete = 0 ");
            if (menu.length > 0) {
                rows[0].menu_data = menu
            }
            return await common.sendResponse(res, Codes.SUCCESS, lang[req.language]['text_home_get_data'], rows[0]);
        }
        catch (error) {
            logger.error(error)
            return await common.sendResponse(res, Codes.INTERNAL_ERROR, lang[req.language]['text_user_something_wrong'], null);
        }
    },
    async userDetail(req) {
        const [rows, fields] = await dbConn.query("SELECT * FROM tbl_user WHERE id=" + req + " and is_delete = 0");
        if (rows.length > 0) {
            return rows;
        }
        else {
            return false;
        }
    },
}

module.exports = home_model;
