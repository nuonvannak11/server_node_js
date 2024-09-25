"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
const setTime_1 = require("../helper/setTimeOut/setTime");
const UserRoutes = (0, express_1.Router)();
// GET ALL USERS FROM DATABASE
UserRoutes.get("/api/users", (0, setTime_1.withTimeout)(userController_1.default.getAllUsers, 10000));
// LOGIN USERS
UserRoutes.post("/api/users/login", (0, setTime_1.withTimeout)(userController_1.default.loginUser, 10000));
// CREATE USERS
UserRoutes.post("/api/users/create", (0, setTime_1.withTimeout)(userController_1.default.createUser, 10000));
// DELETE USERS BY ID
UserRoutes.delete("/api/users/delete/:id", (0, setTime_1.withTimeout)(userController_1.default.deleteUser, 10000));
// UPDATE HOLD ON USERS
UserRoutes.post("/api/users/update/", (0, setTime_1.withTimeout)(userController_1.default.updateUsers, 10000));
// RESTORE USERS
UserRoutes.post("/api/users/forgot", (0, setTime_1.withTimeout)(userController_1.default.restoreUser, 10000));
// GET COLOR
UserRoutes.post("/api/users/get_color/", (0, setTime_1.withTimeout)(userController_1.default.getColor, 10000));
// UPDATE USER BY ID
UserRoutes.put("/api/users/update_byid/:id", (0, setTime_1.withTimeout)(userController_1.default.updateUserById, 10000));
exports.default = UserRoutes;
