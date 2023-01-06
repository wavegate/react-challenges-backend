"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserController = {
    getUsers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield User_1.default.find({}, "-password");
        return res.json({
            users,
        });
    }),
    postUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userData = req.body;
        const checkEmail = yield User_1.default.exists({ email: userData.email });
        if (checkEmail) {
            return res.status(409).json({ message: "User already exists." });
        }
        const hashPassword = yield bcryptjs_1.default.hash(userData.password, 8);
        const user = yield User_1.default.create({
            email: userData.email,
            password: hashPassword,
        });
        if (!process.env.JWT_KEY) {
            throw Error("JWT_KEY not defined.");
        }
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_KEY);
        res.cookie("token", token, {
            expires: new Date(Date.now() + 2592000000),
            httpOnly: true,
        });
        return res.json({ user });
    }),
    loginUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userData = req.body;
        const user = yield User_1.default.findOne({ email: userData.email });
        if (!user) {
            return res.status(401).json({ message: "User does not exist." });
        }
        const checkPassword = yield bcryptjs_1.default.compare(userData.password, user.password);
        if (!checkPassword) {
            return res.status(401).json({ message: "Invalid password." });
        }
        else {
            if (!process.env.JWT_KEY) {
                throw Error("JWT_KEY not defined.");
            }
            const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_KEY);
            res.cookie("token", token, {
                expires: new Date(Date.now() + 2592000000),
                httpOnly: true,
            });
            return res.json({ user });
        }
    }),
    putUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { _id, data } = req.body;
        const user = yield User_1.default.findOneAndUpdate({ _id: _id }, data, {
            new: true,
        });
        return res.json({ user });
    }),
    deleteUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { _id } = req.body;
        const user = yield User_1.default.findOneAndDelete({ _id: _id });
        return res.json({ user });
    }),
};
exports.default = UserController;
