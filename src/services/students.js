import sequelize from 'sequelize';
import db from '../db/models';
import { op, where, cast, col } from 'sequelize';

 class StudentsServices {
  static async CreateStudent(newStudent) {
    return db.student.create(newStudent);
  }


  static async getStudents02() {
    return await db.student.findAndCountAll({
      order:[['id','ASC']]
    });
  }
  static async findStudentById(id) {
    try {
      const student = await db.student.findOne({ where: { id } });
      if (!student) return null;
      return student;
    } catch (er) {
      return undefined;
    }
  }

  static async deleteStudentById(id) {
    try {
      await db.student.destroy({ where: { id } });
      return {
        status: 200,
        message: "Student successfully deleted",
      };
    } catch (er) {
      return {
        status: 500,
        message: er,
      };
    }
  }

  static async updateStudentById(id, name) {
    try {
      return await db.student.update({ name }, { where: { id } });
    } catch (er) {
      return {
        status: 500,
        message: er,
      };
    }
  }
};

export default StudentsServices;