import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/User";
import { RequestHandler } from "express";

/*USER INTERFACE */
interface IUser{
    firstName:string
    lastName:string
    email:string
    password:string
    username:string
}

/* REGISTER USER */
export const register:RequestHandler<unknown, unknown, IUser, unknown>  = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      username
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      password: passwordHash,
      username
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
        next(err)
  }
}

export const getUser:RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findById(id);
        res.status(200).json(user);
    } catch (err) {
        next(err)
    }
};

/* Delete*/
export const deleteUser:RequestHandler = async (req, res, next) => {
    try {
        const {id} = req.params;
        const user = await UserModel.findByIdAndDelete(id);
        res.status(200).json(user);
    } catch (err) {
        next(err)
    }
};
