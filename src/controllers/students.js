const express = require("express");
//const router = express.Router();
//const Joi = require("joi");
require("dotenv").config();
const validateStudent = require("../middlewares/studentvalidation");
const StudentServices = require("../services/students");
const response = require("../helpers/response");

module.exports = class studentsController {
  static async getAll(req, res) {
    // res.send(students);
    try {
      const getStudents = await StudentServices.getStudents02();
      console.log("===========>>", getStudents.rows);
      if (getStudents.count <= 0) {
        const data = null;
        return response.successResponse(res,404,"No students registered yet");
      }
      return response.successResponse(res,200,"list of students",getStudents);
    } catch (error) {
      return response.errorResponse(res,error.message, 500);
    }
  }

  static async postIn(req, res) {
    try {
      const newStudent = await StudentServices.CreateStudent(req.body);
      return response.successResponse(res,201,"Student successfully registered",{name: newStudent.name});
    } catch (error) {
      return response.errorResponse(res,error.message, 500);
    }
  }

  static async getById(req, res) {
    try {
      
      const student = await StudentServices.findStudentById(req.params.id);
      if ( !student || student.count <= 0 ) {
        const data = null;
        return response.errorResponse(res,"No student with that given ID in the database",404);
      }
      return response.successResponse(res, 200, "Student found", student);
    } catch (error) {
      return response.errorResponse(res, error.message, 500);
    }
  }

  static async updateById(req, res) {
    try {

      const student = await StudentServices.findStudentById(req.params.id);
      if (!student || student.count <= 0) {
        const data = null;
        return response.errorResponse(res,"No student with that given ID in the database",404);
      }
      const newName = req.body.name;
      const id = req.params.id;
      await StudentServices.updateStudentById(id,newName);
      return response.response(res,202,"Student successfully updated",{name: newName});
    } catch (error) {
      return response.errorResponse(res, error.message, 500);
    }
  }

  static async deleteById(req, res) {
    try {
      const student = await StudentServices.findStudentById(req.params.id);
      if (!student || student.count <= 0) {
        const data = null;
        return response.errorResponse(res,"No student with that given ID in the database",404);
      }
      await StudentServices.deleteStudentById(req.params.id);
      const data = null;
      return response.successResponse(res,200,"Student successfully deleted");
    } catch (err) {
      return response.errorResponse(res, error.message, 500);
    }
  }
};
