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


  static async findUserByEmail(username) {
    try {
      const user = await db.user.findOne({ where: { username } });
      if (!user) return null;
      return user;
    } catch (er) {
      return undefined;
    }
  }

};

export default UsersServices;
