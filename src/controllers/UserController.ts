import { dotenv } from "dotenv";
import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserController = {
  getUsers: async (req: Request, res: Response) => {
    const users = await User.find({}, "-password");
    return res.json({
      users,
    });
  },

  postUser: async (req: Request, res: Response) => {
    const userData = req.body;
    const checkEmail = await User.exists({ email: userData.email });
    if (checkEmail) {
      return res.status(409).json({ message: "User already exists." });
    }
    const hashPassword = await bcrypt.hash(userData.password, 8);
    const user = await User.create({
      email: userData.email,
      password: hashPassword,
    });
    if (!process.env.JWT_KEY) {
      throw Error("JWT_KEY not defined.");
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
    res.cookie("token", token, {
      expires: new Date(Date.now() + 2592000000),
      httpOnly: true,
    });
    return res.json({ user });
  },

  loginUser: async (req: Request, res: Response) => {
    const userData = req.body;
    const user = await User.findOne({ email: userData.email });
    if (!user) {
      return res.status(401).json({ message: "User does not exist." });
    }
    const checkPassword = await bcrypt.compare(
      userData.password,
      user.password
    );
    if (!checkPassword) {
      return res.status(401).json({ message: "Invalid password." });
    } else {
      if (!process.env.JWT_KEY) {
        throw Error("JWT_KEY not defined.");
      }
      const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
      res.cookie("token", token, {
        expires: new Date(Date.now() + 2592000000),
        httpOnly: true,
      });
      return res.json({ user });
    }
  },

  putUser: async (req: Request, res: Response) => {
    const { _id, data } = req.body;
    const user = await User.findOneAndUpdate({ _id: _id }, data, {
      new: true,
    });
    return res.json({ user });
  },

  deleteUser: async (req: Request, res: Response) => {
    const { _id } = req.body;
    const user = await User.findOneAndDelete({ _id: _id });
    return res.json({ user });
  },
};

export default UserController;
