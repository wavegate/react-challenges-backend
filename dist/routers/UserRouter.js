"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = __importDefault(require("../controllers/UserController"));
const express_1 = __importDefault(require("express"));
const checkToken_1 = __importDefault(require("../middleware/checkToken"));
const UserRouter = express_1.default.Router();
UserRouter.get("/", UserController_1.default.getUsers);
UserRouter.post("/", UserController_1.default.postUser);
UserRouter.post("/login", UserController_1.default.loginUser);
UserRouter.put("/", checkToken_1.default, UserController_1.default.putUser);
UserRouter.delete("/", checkToken_1.default, UserController_1.default.deleteUser);
exports.default = UserRouter;
