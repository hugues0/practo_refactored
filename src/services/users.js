const sequelize = require("sequelize");
const db = require("../db/models");

module.exports = class UsersServices {
  static async createUser(newUser) {
    return db.users(newUser);
  }

  static async findUserById(id) {
    try {
      const user = await db.users.findOne({ where: { id } });
      if (!user) return null;
      return user;
    } catch (er) {
      return undefined;
    }
  }

  static async findUserByUsername(username) {
    try {
      const user = await db.users.findOne({ where: { username } });
      if (!user) return null;
      return user;
    } catch (er) {
      return undefined;
    }
  }

  static async deleteUserById(id) {
    try {
      await db.users.destroy({ where: { id } });
      return {
        status: 200,
        message: "User successfully deleted",
      };
    } catch (er) {
      return {
        status: 500,
        message: er,
      };
    }
  }

  static async updateStudentById(id, username,password) {
    try {
      return await db.users.update({ username,password }, { where: { id } });
    } catch (er) {
      return {
        status: 500,
        message: er,
      };
    }
  }
};
