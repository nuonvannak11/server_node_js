import { Router } from "express";
import UserController from "../controllers/userController";
import { withTimeout } from "../helper/setTimeOut/setTime";
const UserRoutes = Router();

// GET ALL USERS FROM DATABASE
UserRoutes.get("/api/users", withTimeout(UserController.getAllUsers, 10000));

// LOGIN USERS
UserRoutes.post(
  "/api/users/login",
  withTimeout(UserController.loginUser, 10000)
);

// CREATE USERS
UserRoutes.post(
  "/api/users/create",
  withTimeout(UserController.createUser, 10000)
);

// DELETE USERS BY ID
UserRoutes.delete(
  "/api/users/delete/:id",
  withTimeout(UserController.deleteUser, 10000)
);

// UPDATE HOLD ON USERS
UserRoutes.post(
  "/api/users/update/",
  withTimeout(UserController.updateUsers, 10000)
);

// RESTORE USERS
UserRoutes.post(
  "/api/users/forgot",
  withTimeout(UserController.restoreUser, 10000)
);

// GET COLOR
UserRoutes.post(
  "/api/users/get_color/",
  withTimeout(UserController.getColor, 10000)
);

// UPDATE USER BY ID
UserRoutes.put(
  "/api/users/update_byid/:id",
  withTimeout(UserController.updateUserById, 10000)
);

// USER ORDER
UserRoutes.post(
  "/api/users/order",
  withTimeout(UserController.UserOrderData, 100000)
);

UserRoutes.post(
  "/api/users/get_order",
  withTimeout(UserController.GetOrderData, 100000)
);

export default UserRoutes;
