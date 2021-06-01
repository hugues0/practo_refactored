const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validateUser = require("../middlewares/usersvalidation");
const users = require("../models/users");
const response = require("../helpers/response");
const usersServices = require('../services/users');

module.exports = class usersController {
  //register a new user
  static async addUser(req, res) {
    const user = await usersServices.findUserByUsername(req.body.name);
    
    if (user.count > 0) {
      response.response(
        res,
        409,
        "error",
        "User with given Username/Email already exists",
        true
      );
    } else {
      const { username, password } = req.body;

      const saltRounds = 10;
      const newPassword = await bcrypt.hash(password, saltRounds);
      console.log(newPassword);
      const addUser = {
        id: users.length + 1,
        username,
        newPassword,
      };
      users.push(addUser);
      const userInfo = { ...addUser };
      delete userInfo.newPassword;



      const usermail = users.filter(
        (usermail) =>
          usermail.username.toLocaleLowerCase() ===
          req.body.username.toLowerCase()
      );

      const token = jwt.sign(
        { id: usermail[0].id, username: usermail[0].username },
        process.env.JWT, {expiresIn: 12000}
      );
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

    return response;
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