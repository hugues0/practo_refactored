import sequelize from 'sequelize';
import db from '../db/models';

class UsersServices {
  static async createUser(newUser) {
    try {
      return await db.user.create(newUser);
    } catch (er) {
      return undefined;
    }
  }

  static async findUserById(id) {
    try {
      const user = await db.user.findOne({ where: { id } });
      if (!user) return null;
      return user;
    } catch (er) {
      return undefined;
    }
  }

  static async findUserByEmail(username) {
    try {
      const user = await db.user.findOne({ where: { username } });
      if (!user) return null;
      return user;
    } catch (er) {
      return undefined;
    }
  }

  static async deleteUserById(id) {
    try {
      await db.user.destroy({ where: { id } });
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

  static async updateStudentById(id, username, password) {
    try {
      return await db.user.update({ username, password }, { where: { id } });
    } catch (er) {
      return {
        status: 500,
        message: er,
      };
    }
  }
};

export default UsersServices;
