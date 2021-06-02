const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validateUser = require("../middlewares/usersvalidation");
const users = require("../models/users");
const response = require("../helpers/response");
const UsersServices = require("../services/users");
require("dotenv").config();


module.exports = class usersController {
  //register a new user
  static async addUser(req, res) {
    try {
      let { username, password } = req.body;
      const existUser = await UsersServices.findUserByEmail(username);
      console.log(existUser);
      if (existUser)
        return response.response(
          res,
          409,
          "error",
          "User already exist in the database",
          true
        );
      const saltRounds = 10;
      password = await bcrypt.hash(password, saltRounds);
      console.log(password);
      const newUser = { username, password };
      await UsersServices.createUser(newUser);
      const userInfo = { ...newUser };
      delete userInfo.password;

      const token = jwt.sign({ username: newUser.username }, process.env.JWT, {
        expiresIn: 12000,
      });
      const data = {
        token,
        userInfo,
      };
      return response.response(
        res,
        201,
        "New user created successfully",
        data,
        false
      );
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
        return response.response(
          res,
          404,
          "error",
          "Invalid username,try again",
          true
        );
      const passwordMatch = await bcrypt.compare(password, userExist.password);
      if (!passwordMatch)
        return res
          .status(401)
          .json({ status: 401, error: "Invalid password, try again" });
      const { id } = userExist;

      const token = jwt.sign({ id }, process.env.JWT, {
        expiresIn: 12000,
      });
      const data = { id, username, token };
      return response.response(
        res,
        409,
        "User successfully logged in",
        data,
        false
      );
    } catch (error) {
      return error.message;
    }
  }
};
