const sequelize = require("sequelize");
const db = require("../db/models");
const { op, where, cast, col } = sequelize;

module.exports = class StudentsServices {
  static async CreateStudent(newStudent) {
    return db.student.create(newStudent);
  }

  static async getStudents() {
   /*  try{
    return await db.student
      .findAll()
      .then((student) => res.status(200).send(student));
    }catch(error){
      res.status(400).send(error);
    }
 */


     try {

      console.log("===========>>", model);
      const searchStudents = await db.student.findAll();
      if (!searchStudents) return null;
      return searchStudents;
    } catch (error) {
      return undefined;
    } 
  }

  static async getStudents02(){
   return await db.student.findAndCountAll();
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

  static async updateUserById(id) {
    try {
      const studentToUpdate = await db.student.findOne({ where: { id } });
      if (studentToUpdate) {
        await db.student.update(id, {
          where: { id },
        });
      } else if (!studentToUpdate) {
        return {
          status: 404,
          message: "The user with given id was not found",
        };
      }
    } catch (er) {
      return {
        status: 500,
        message: er,
      };
    }
  }
};
