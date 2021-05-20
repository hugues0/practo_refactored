const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validateUser = require("../middlewares/usersvalidation");
const users = require("../models/users");
const response = require("../helpers/response");

module.exports = class usersController {
  //register a new user
  static async addUser(req, res) {
    const user = users.filter(
      (usermail) =>
        usermail.username.toLowerCase() === req.body.username.toLowerCase()
    );
    if (user.length > 0) {
      response.response(
        res,
        409,
        "error",
        "User with given email already exists",
        true
      );
    } else {
      const { username, password } = req.body;

      const addUser = {
        id: users.length + 1,
        username,
        password,
      };
      const salt = await bcrypt.genSalt(10);
      addUser.password = await bcrypt.hash(addUser.password, salt);
      users.push(addUser);
      const hideitems = { ...addUser };
      delete hideitems.password;

      const usermail = users.filter(
        (usermail) =>
          usermail.username.toLocaleLowerCase() ===
          req.body.username.toLowerCase()
      );

      const token = jwt.sign(
        { id: usermail[0].id, username: usermail[0].username },
        process.env.JWT
      );
      const data = {
        token,
        hideitems,
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
    const {password} = req.body;

    const user = users.filter(
      (usermail) =>
        usermail.username.toLowerCase() ===
        req.body.username.toLowerCase().trim()
    );
    console.log(req.body.username);
    console.log(password);
    
    if (user.length > 0) {
      //from here (things to fix)
      bcrypt.compare(password, user[0].password,function (error,isMatch){
        
        if (error) {
    throw error
  } else if (isMatch) {
    
     return response.response(
          res,
          401,
          "error",
          "invalid username or password",
          true
          );
    
    //console.log("Password doesn't match!")
  } else {

    //console.log("Password matches!")


        const token = jwt.sign(
          { id: user[0], username: user[0].password },
          process.env.JWT,
        );

        const data = {
          token,
        };

        return response.response(res, 200, "success", data, false);


  }
      });
        
        
    }//else{
     //return response.response(
       //    res,
        // 401,
       //'error',
     //'invalid username or password',
    // true,
    //);
    // }
  
  }
}