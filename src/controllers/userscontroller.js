const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validateUser = require("../middlewares/usersvalidation");
const users = require("../models/users");
const response = require("../helpers/response");
const UsersServices = require('../services/users');
require("dotenv").config()
//const bcrypt = require('bcrypt');

module.exports = class usersController {
  //register a new user
  static async addUser(req, res) {
    let {username,password} = req.body;
    const existUser = await UsersServices.findUserByEmail(username);
    console.log(existUser);
    if(existUser) return response.response(res,409,"error","User already exist in the database",true);
    const saltRounds = 10;
    password = await bcrypt.hash(password, saltRounds);
    console.log(password);
    const newUser = {username,password};
    await UsersServices.createUser(newUser);
    const userInfo = { ...newUser };
    delete userInfo.password;
    
    const token = jwt.sign(
        { username: newUser.username },
        process.env.JWT, {expiresIn: 12000});
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
    
  }

  //user login

  static async loginUser(req, res) {
    const { password } = req.body;

    const user = users.filter(
      (usermail) =>
        usermail.username.toLowerCase() ===
        req.body.username.toLowerCase().trim()
    );
    console.log(req.body.username);
    console.log(password);

    if (user.length > 0) {
      if (bcrypt.compareSync(password, user[0].newPassword)) {
        const token = jwt.sign(
          { id: user[0].id, username: user[0].username },
          process.env.JWT,{expiresIn: 12000 }
        );
        const data = { token };
        response.response(res, 200, `User ${user[0].username} successfully logged in`, data, false);
      } else {
        return response.response(
          res,
          401,
          "error",
          "Invalid username or password",
          true
        );
      }
    } else {
      return response.response(
        res,
        401,
        "error",
        "Invalid username or password",
        true
      );
    }
    return response;
  }
}