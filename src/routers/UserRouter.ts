import UserController from "../controllers/UserController";
import express from "express";
import checkToken from "../middleware/checkToken";

const UserRouter = express.Router();

UserRouter.get("/", UserController.getUsers);
UserRouter.post("/", UserController.postUser);
UserRouter.post("/login", UserController.loginUser);
UserRouter.put("/", checkToken, UserController.putUser);
UserRouter.delete("/", checkToken, UserController.deleteUser);

export default UserRouter;
