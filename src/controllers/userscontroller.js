//const jwt = require("jsonwebtoken");
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
//const bcrypt = require("bcrypt");
import validateUser from '../middlewares/usersvalidation';
import response from '../helpers/response';
import UsersServices from '../services/users';
import generateToken from '../helpers/tokengen';
import encryptPassword from '../helpers/encryptor';
import decryptPasswword from '../helpers/decryptor';
require("dotenv").config();


class usersController {
  //register a new user
  static async addUser(req, res) {
    try {
      let { username, password } = req.body;
      const existUser = await UsersServices.findUserByEmail(username);
      console.log(existUser);
      if (existUser)
        return response.errorResponse(res,"User already exist in the database",409);
      password = await encryptPassword(password);
      console.log(password);
      const newUser = { username, password };
      await UsersServices.createUser(newUser);
      const userInfo = { ...newUser };
      delete userInfo.password;
      const token = generateToken({username: newUser.username});
      const data = {
        token,
        userInfo,
      };
      return response.successResponse(res,201,"New user created successfully",data);
    } catch (error) {
      return error.message;
    }
  }

  //user login

  static async loginUser(req, res) {
    try {
      const { username, password } = req.body;

      const userExist = await UsersServices.findUserByEmail(username);
      if (!userExist)
        return response.errorResponse(res,"Invalid credentials,try again",404);
      const passwordMatch = await decryptPasswword(password, userExist.password);
      if (!passwordMatch)
        return response.errorResponse(res, "Invalid credentials,try again", 404);
      const { id } = userExist;
      const token = generateToken({ id });
      const data = { id, username, token };
      return response.successResponse(res,200,"New user created successfully",data);
    } catch (error) {
      return error.message;
    }
  }
};

export default usersController;