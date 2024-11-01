"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../models/userModel"));
const userModelCode_1 = __importDefault(require("../models/userModelCode"));
const userModelColor_1 = __importDefault(require("../models/userModelColor"));
const socket_1 = require("../helper/socket");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const helperFunctions_1 = require("../utils/helperFunctions");
const decriptsData_1 = require("../helper/decripts/decriptsData");
const convert_1 = require("../helper/readData/convert");
const readDecript_1 = require("../helper/returnDecript/readDecript");
const dateUntil_1 = require("../helper/datetime/dateUntil");
const prepareData_1 = require("../helper/readData/prepareData");
const random_1 = require("../helper/randomNumber/random");
const sendEmail_1 = require("../utils/message/email/sendEmail");
const dotenv_1 = require("dotenv");
const userMiddleware_1 = require("../middlewares/users/userMiddleware");
const user_create_1 = require("../databases/create/user_create");
const user_order_select_1 = require("../databases/read/user_order_select");
(0, dotenv_1.config)();
const secretKey = process.env.JWT_SECRET_KEY || "";
const getAllUsers = async (req, res) => {
    try {
        const allUsers = await userModel_1.default.findAll();
        socket_1.io.emit("newUsers", allUsers);
        res.status(200).json(allUsers);
    }
    catch (error) {
        console.error("Error retrieving users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const regex = /(\d+)#(.+)/;
        const match_user = (0, helperFunctions_1.decryptPassword)(username).data.match(regex);
        const match_password = (0, helperFunctions_1.decryptPassword)(password).data.match(regex);
        let passwordUser;
        let usernameUser;
        if (match_user) {
            const code_user = parseInt(match_user[1], 10);
            const data_user = match_user[2];
            if (code_user === -500 || code_user === -10) {
                res.status(200).json({ message: data_user, code: -1 });
                return;
            }
            if (code_user === 200) {
                usernameUser = data_user;
            }
        }
        else {
            res.status(200).json({
                code: -1,
                message: "Decryption Username Failed",
            });
            return;
        }
        if (match_password) {
            const code_password = parseInt(match_password[1], 10);
            const data_password = match_password[2];
            if (code_password === -500 || code_password === -10) {
                res.status(200).json({ message: data_password, code: -1 });
                return;
            }
            if (code_password === 200) {
                passwordUser = data_password;
            }
        }
        else {
            res.status(200).json({
                code: -1,
                message: "Decryption Password Failed",
            });
            return;
        }
        try {
            const datauser = await userModel_1.default.findOne({
                where: { name: usernameUser },
            });
            if (!datauser) {
                res.status(200).json({ code: -1, message: "Username not found" });
                return;
            }
            const userData = datauser.get();
            if (userData.name.toString() !== usernameUser) {
                res.status(200).json({
                    code: -1,
                    message: "Username does not match",
                });
                return;
            }
            if (passwordUser !== userData.password.toString()) {
                res.status(200).json({
                    code: -1,
                    message: "Password does not match",
                });
                return;
            }
            const token = jsonwebtoken_1.default.sign({ id: userData.id }, secretKey, {
                expiresIn: "8760h",
            });
            const data = (0, convert_1.convertData)(userData);
            res.status(200).json({
                code: 1,
                message: "Login successful",
                token: token,
                datauser: data,
            });
        }
        catch (error) {
            res.status(200).json({
                code: -1,
                message: "Something When Wronge During Login",
                error: error,
            });
            console.error("Error logging in:", error);
        }
    }
    catch (error) {
        res.status(200).json({
            code: -1,
            message: "Invalid Data",
            error: error,
        });
        console.error("Error logging in:", error);
    }
};
const createUser = async (req, res) => {
    const { username, password, email } = req.body;
    const decryptedPassword = (0, helperFunctions_1.decryptPassword)(password);
    const decryptedEmail = (0, helperFunctions_1.decryptPassword)(email);
    const passwordDecrypted = (0, readDecript_1.convertDecript)(decryptedPassword, "password");
    const emailDecrypted = (0, readDecript_1.convertDecript)(decryptedEmail, "email");
    let passwordDecript;
    let emailDecript;
    if (passwordDecrypted.code === "-1" || emailDecrypted.code === "-1") {
        res.status(200).json({
            message: "Try again, bruh!",
            code: "-1",
        });
        return;
    }
    if (passwordDecrypted.code === "-2" || emailDecrypted.code === "-2") {
        res.status(200).json({
            message: "ERR_OSSL_BAD_DECRYPT",
            code: "-1",
        });
        return;
    }
    if (passwordDecrypted.code === "1" || emailDecrypted.code === "1") {
        passwordDecript = passwordDecrypted.data;
        emailDecript = emailDecrypted.data;
    }
    if (!passwordDecript) {
        res.status(200).json({
            message: "Password decryption failed",
            code: "-1",
        });
        return;
    }
    if (!emailDecript) {
        res.status(200).json({
            message: "Email decryption failed",
            code: "-1",
        });
        return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailDecript)) {
        res.status(200).json({
            message: "Invalid email format",
            code: "-1",
        });
        return;
    }
    try {
        const user = await userModel_1.default.findOne({
            where: { name: username },
        });
        if (user) {
            res.status(200).json({
                message: "Username Aleady Exist!",
                code: "-1",
            });
            return;
        }
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(200).json({ error: "Internal server error" });
    }
    try {
        const newUser = await userModel_1.default.create({
            name: username,
            password: passwordDecript,
            email: emailDecript,
        });
        if (!newUser) {
            res.status(200).json({
                message: "User error creating!",
                code: "-1",
            });
            return;
        }
        const user = (await userModel_1.default.findOne({
            where: { name: username },
        }));
        const token = jsonwebtoken_1.default.sign({ id: user.dataValues.id }, secretKey, {
            expiresIn: "8760h",
        });
        const data = (0, convert_1.convertData)(user);
        socket_1.io.emit("newUsers", await userModel_1.default.findAll());
        res.status(200).json({
            message: "Register successful",
            code: "1",
            token: token,
            datauser: data,
        });
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(200).json({ error: "Internal server error" });
    }
};
const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const deletedUser = await userModel_1.default.destroy({
            where: { id: userId },
        });
        if (deletedUser) {
            socket_1.io.emit("newUsers", await userModel_1.default.findAll());
            res.status(200).json({ message: "User deleted successfully" });
        }
        else {
            res.status(404).json({ error: "User not found" });
        }
    }
    catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
const updateUsers = async (req, res) => {
    const { userData, tokenUser } = req.body;
    let data_token;
    try {
        data_token = jsonwebtoken_1.default.verify(tokenUser, secretKey);
    }
    catch (error) {
        res.status(200).json({
            code: -1,
            message: "Unauthorized Access",
            error: error,
        });
        return;
    }
    const id_user = data_token.id;
    const find_user = await userModel_1.default.findOne({
        where: { id: id_user },
    });
    if (find_user) {
        const { prepareData, errorData } = (0, decriptsData_1.ConvertDataDecripts)(userData);
        if (errorData.length > 0) {
            const entries = Object.entries(errorData[0]);
            res.status(200).json({
                code: -1,
                message: `${entries[0][0]} # ${entries[0][1]}`,
            });
            return;
        }
        if (prepareData && Array.isArray(prepareData) && prepareData.length > 0) {
            const data = prepareData;
            let convert = {};
            data.forEach((item) => {
                const key = Object.keys(item)[0];
                convert[key] = item[key];
            });
            const datetime = (0, dateUntil_1.getCurrentDateTime)();
            const userData = find_user.get();
            const dataprepared = (0, prepareData_1.PrepareDataBeforeUpdate)(convert, userData);
            try {
                const [numberOfAffectedRows] = await userModel_1.default.update({
                    tel: dataprepared.tel,
                    age: dataprepared.age,
                    gender: dataprepared.gender,
                    address: dataprepared.address,
                    telegram: dataprepared.telegram,
                    bankacc: dataprepared.bankacc,
                    bankno: dataprepared.bankno,
                    salary: dataprepared.salary,
                    contact_us: dataprepared.contact_us,
                    image: dataprepared.image,
                    update_at: datetime,
                }, { where: { id: id_user } });
                if (numberOfAffectedRows === 0) {
                    res.status(200).json({
                        code: -1,
                        message: "Fail Update Information!",
                    });
                    return;
                }
                const newuserupdate = await userModel_1.default.findOne({
                    where: { id: id_user },
                });
                if (!newuserupdate) {
                    res.status(200).json({
                        code: -1,
                        message: "User Not Found!",
                    });
                    return;
                }
                const userDataNew = (0, convert_1.convertData)(newuserupdate.get());
                res.status(200).json({
                    code: 1,
                    message: "User updated successfully!",
                    datauser: userDataNew,
                });
            }
            catch (error) {
                console.log(error);
                res.status(200).json({
                    code: -1,
                    message: "Error updating user",
                });
            }
        }
        else {
            res.status(200).json({
                code: -1,
                message: "Error updating user",
            });
        }
    }
    else {
        res.status(200).json({
            code: -1,
            message: "User Not Found!",
        });
        return;
    }
};
const restoreUser = async (req, res) => {
    const { data } = req.body;
    const { prepareData, errorData } = (0, decriptsData_1.ConvertDataDecripts)(data);
    const datetime = (0, dateUntil_1.getCurrentDateTime)();
    try {
        if (data) {
            if (errorData.length > 0) {
                const entries = Object.entries(errorData[0]);
                res.status(200).json({
                    error: `${entries[0][0]} # ${entries[0][1]}`,
                    code: "-1",
                });
                return;
            }
            if (prepareData && Array.isArray(prepareData) && prepareData.length > 0) {
                const data = prepareData;
                let convert = {};
                data.forEach((item) => {
                    const key = Object.keys(item)[0];
                    convert[key] = item[key];
                });
                if (convert.type === "first") {
                    const user = await userModel_1.default.findOne({
                        where: { name: convert.username },
                    });
                    if (!user) {
                        res.status(200).json({ message: "User not found", code: "-1" });
                        return;
                    }
                    res
                        .status(200)
                        .json({ message: "User found", code: "1", type: "second" });
                    return;
                }
                const user = await userModel_1.default.findOne({
                    where: { name: convert.username },
                });
                if (!user) {
                    res.status(200).json({ message: "User not found", code: "-1" });
                    return;
                }
                const userData = user.get();
                if (convert.type === "second") {
                    const codedata = (0, random_1.RandomNumber)(6);
                    const email = userData.email;
                    const code_confirm = codedata;
                    const username = userData.name;
                    try {
                        const response = await (0, sendEmail_1.SendUserCode)(email, code_confirm, username);
                        if (response.code === "1") {
                            const search_data = await userModelCode_1.default.findOne({
                                where: { userid: userData.id },
                            });
                            if (search_data) {
                                const restoreCode = await userModelCode_1.default.update({
                                    code: code_confirm,
                                    password: convert.password,
                                    session: "allowType",
                                }, { where: { userid: userData.id } });
                                console.log("udateCode=", restoreCode);
                            }
                            else {
                                const restoreCode = await userModelCode_1.default.create({
                                    userid: userData.id,
                                    password: convert.password,
                                    code: code_confirm,
                                    session: "allowType",
                                });
                                console.log("restoreCode=", restoreCode);
                            }
                            res.status(200).json({
                                message: "successful",
                                code: "1",
                                data: `Code 6digit has been send to email#${userData.email}`,
                                type: "third",
                            });
                            return;
                        }
                        if (response.code === "-1") {
                            res.status(200).json({
                                message: "problem",
                                code: "-1",
                                data: `can't send code 6digit to email#${userData.email}`,
                            });
                            return;
                        }
                    }
                    catch (error) {
                        console.error("Error:", error);
                        res
                            .status(200)
                            .json({ message: "problem", code: "-1", error: error });
                    }
                }
                if (convert.type === "third") {
                    try {
                        const search_data = await userModelCode_1.default.findOne({
                            where: { userid: userData.id },
                        });
                        if (!search_data) {
                            res
                                .status(200)
                                .json({ message: "not found data in third case", code: "-1" });
                            return;
                        }
                        const datauser = search_data.get();
                        const datacode = parseInt(convert.datacode);
                        const datacodeuser = parseInt(datauser.code, 10);
                        if (datacodeuser !== datacode) {
                            res.status(200).json({ message: "code not match", code: "-1" });
                            return;
                        }
                        const updatePassword = await userModel_1.default.update({
                            password: datauser.password,
                            update_at: datetime,
                        }, { where: { id: userData.id } });
                        if (!updatePassword) {
                            res
                                .status(200)
                                .json({ message: "fail update password", code: "-1" });
                            return;
                        }
                        const uerUpdate = await userModel_1.default.findOne({
                            where: { id: userData.id },
                        });
                        if (!uerUpdate) {
                            res.status(200).json({ message: "User not found", code: "-1" });
                            return;
                        }
                        const data_update = uerUpdate.get();
                        const email = data_update.email;
                        const code_confirm = "success";
                        const username = data_update.name;
                        try {
                            const response = await (0, sendEmail_1.SendUserCode)(email, code_confirm, username);
                            const token = jsonwebtoken_1.default.sign({ id: data_update.id }, secretKey, {
                                expiresIn: "8760h",
                            });
                            const data = (0, convert_1.convertData)(data_update);
                            if (response.code === "1") {
                                res.status(200).json({
                                    message: "successful",
                                    code: "1",
                                    data: "Successful Update",
                                    type: "foure",
                                    token: token,
                                    datauser: data,
                                });
                                return;
                            }
                            if (response.code === "-1") {
                                res.status(200).json({
                                    message: "problem",
                                    code: "-1",
                                    data: "can't send email data",
                                });
                                return;
                            }
                        }
                        catch (error) {
                            console.error("Error:", error);
                            res.status(200).json({
                                message: "problem",
                                code: "-1",
                                error: error,
                            });
                        }
                    }
                    catch (error) {
                        console.error("Error:", error);
                        res.status(200).json({
                            message: "problem",
                            code: "-1",
                            error: error,
                        });
                    }
                }
            }
        }
        else {
            res.status(200).json({
                message: "not found data first case",
                code: "-1",
            });
            return;
        }
    }
    catch (error) {
        console.error("Error restore user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
//FOLLOW USER BY ID
const updateUserById = async (req, res) => {
    const userId = req.params.id;
    const { name, email } = req.body;
    try {
        const updatedUser = await userModel_1.default.update({ name, email }, { where: { id: userId } });
        if (updatedUser[0]) {
            socket_1.io.emit("newUsers", await userModel_1.default.findAll());
            res.status(200).json({ message: "User updated successfully" });
        }
        else {
            res.status(404).json({ error: "User not found" });
        }
    }
    catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
const getColor = async (req, res) => {
    const { nameColor, tokenId, ip } = req.body;
    console.log("ip_user==", ip);
    let data;
    try {
        const decoded = jsonwebtoken_1.default.verify(tokenId, secretKey);
        data = decoded;
    }
    catch (error) {
        res.status(200).json({
            code: -1,
            message: "Unauthorized Access",
            error: error,
        });
        return;
    }
    const id_user = data.id;
    const checkUser = await userModel_1.default.findOne({ where: { id: id_user } });
    const datetime = (0, dateUntil_1.getCurrentDateTime)().toString();
    if (checkUser) {
        const checkUserColor = await userModelColor_1.default.findOne({
            where: { userid: id_user },
        });
        if (checkUserColor) {
            const update_color = await userModelColor_1.default.update({
                color_theme: nameColor,
                update_at: datetime,
            }, { where: { userid: id_user } });
            if (update_color) {
                res.status(200).json({
                    code: 1,
                    message: "Change Theme Successful!",
                    data: nameColor,
                });
                return;
            }
            else {
                res.status(200).json({
                    code: -1,
                    message: "Error Update Theme!",
                });
                return;
            }
        }
        else {
            const create_color = await userModelColor_1.default.create({
                userid: id_user,
                color_theme: nameColor,
                create_at: datetime,
                update_at: datetime,
            });
            if (create_color) {
                res.status(200).json({
                    code: 1,
                    message: "Change Theme Successful!",
                    data: nameColor,
                });
                return;
            }
            else {
                res.status(200).json({
                    code: -1,
                    message: "Error Create Theme!",
                });
                return;
            }
        }
    }
    else {
        res.status(200).json({ code: -1, message: "User Not Found!" });
        return;
    }
};
const UserOrderData = async (req, res) => {
    const { formdata } = req.body;
    const { prepareData, errorData } = (0, decriptsData_1.ConvertDataDecripts)(formdata);
    if (!(0, helperFunctions_1.empty)(errorData)) {
        const entries = Object.entries(errorData[0]);
        res.status(200).json({
            code: -1,
            message: `${entries[0][0]} # ${entries[0][1]}`,
        });
        return;
    }
    if (!(0, helperFunctions_1.empty)(prepareData)) {
        const prepareDataObj = prepareData.reduce((acc, item) => {
            return { ...acc, ...item };
        }, {});
        const userID = prepareDataObj.user_id;
        const productID = prepareDataObj.product_id;
        const productQTY = prepareDataObj.product_qty;
        const productPrice = prepareDataObj.product_amount;
        const payType = prepareDataObj.pay_type;
        const cardName = prepareDataObj.card_name;
        const cardNumber = prepareDataObj.card_number;
        const cardEXP = prepareDataObj.card_exp;
        const cardCVV = prepareDataObj.card_cvv;
        const product_discount = 34;
        if ((0, helperFunctions_1.empty)(userID)) {
            res.status(200).json({
                code: -6,
                message: "User Id not found!",
            });
            return;
        }
        if ((0, helperFunctions_1.empty)(productID)) {
            res.status(200).json({
                code: -7,
                message: "Product Id not found!",
            });
            return;
        }
        if ((0, helperFunctions_1.lower_text)(payType) === "stripe") {
            (0, userMiddleware_1.validateCardDetails)(cardName, cardNumber, cardEXP, cardCVV, res);
        }
        const respond = await (0, user_create_1.create_order)((0, helperFunctions_1.cv_num)(userID), (0, helperFunctions_1.cv_num)(productID), (0, helperFunctions_1.cv_str)(productQTY), (0, helperFunctions_1.cv_str)(productPrice), (0, helperFunctions_1.cv_str)(product_discount), (0, helperFunctions_1.cv_str)(payType), (0, helperFunctions_1.cv_str)((0, dateUntil_1.getCurrentDateTime)()));
        if (respond.code === 1) {
            const respond_get_product = await (0, user_order_select_1.getUserOrdersWithProductsAll)();
            socket_1.io.emit("DataAllOrders", respond_get_product);
            res.status(200).json({
                code: 1,
                message: "Order created successfully",
            });
            return;
        }
        else {
            res.status(200).json({
                code: -1,
                message: "Failed to create order",
            });
            return;
        }
    }
    else {
        res.status(200).json({
            code: -1,
            message: "Check Out Fail",
        });
    }
};
const GetOrderData = async (req, res) => {
    const { userId } = req.body;
    const regex = /(\d+)#(.+)/;
    const match_userId = (0, helperFunctions_1.decryptPassword)(userId).data.match(regex);
    if (match_userId) {
        const code_user = parseInt(match_userId[1], 10);
        const data_user = match_userId[2];
        if (code_user === -500 || code_user === -10) {
            res.status(200).json({ message: data_user, code: -1 });
            return;
        }
        if (code_user === 200) {
            const respond_get_product = await (0, user_order_select_1.getUserOrdersWithProducts)(data_user);
            res.status(200).json({
                code: 1,
                message: "Get data order successfully",
                data: respond_get_product,
            });
            return;
        }
    }
    else {
        res.status(200).json({
            code: -1,
            message: "Decryption Failed",
        });
        return;
    }
};
const UserController = {
    getAllUsers,
    loginUser,
    createUser,
    deleteUser,
    updateUserById,
    updateUsers,
    restoreUser,
    getColor,
    UserOrderData,
    GetOrderData,
};
exports.default = UserController;
