const express = require("express");
//const router = express.Router();
//const Joi = require("joi");
require("dotenv").config();
const validateStudent = require("../middlewares/studentvalidation");
const students = require("../models/studentsmodel");
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
        return response.response(
          res,
          404,
          "No students registered yet",
          data,
          false
        );
      }
      return response.response(
        res,
        200,
        "list of students",
        getStudents,
        false
      );
    } catch (error) {
      return response.response(res, 500, "error", error.message, true);
    }
  }

  static async postIn(req, res) {
    const { error } = validateStudent(req.body);
    if (error) return res.status(404).send(error.details[0].message);
    try {
      const newStudent = await StudentServices.CreateStudent(req.body);
      //const { data } = newStudent;
      return response.response(
        res,
        201,
        "Student successfully registered",
        {
          name: newStudent.name,
        },
        false
      );
    } catch (error) {
      return response.response(res, 500, "", error.details[0].message, true);
    }
  }

  static async getById(req, res) {
    try {
      const student = await StudentServices.findStudentById(req.params.id);
      if (student.count <= 0) {
        const data = null;
        return response.response(
          res,
          404,
          "No student with that given ID in the database",
          data,
          false
        );
      }
      return response.response(res, 200, "Student found", student, false);
    } catch (error) {
      return response.response(res, 500, "", error.details[0].message, true);
    }
  }

  static async updateById(req, res) {
    try {
      const student = await StudentServices.findStudentById(req.params.id);
      if (student.count <= 0) {
        const data = null;
        return response.response(
          res,
          404,
          "No student with that given ID in the database",
          data,
          false
        );
      }
      const { error } = validateStudent(req.body);
      if (error) return res.status(404).send(error.details[0].message);
      const newStudent = await StudentServices.updateUserById(req.body);
      return response.response(
        res,
        201,
        "Student successfully updated",
        {
          name: newStudent.name,
        },
        false
      );
    } catch (error) {
      return response.response(res, 500, "", error.details[0].message, true);
    }
  }

  static async deleteById(req, res) {
    try {
      const student = await StudentServices.findStudentById(req.params.id);
      if (student.count <= 0) {
        const data = null;
        return response.response(
          res,
          404,
          "No student with that given ID in the database",
          data,
          false
        );
      }
      await StudentServices.deleteStudentById(req.params.id);
      const data = null;
      return response.response(
        res,
        200,
        "Student successfully deleted",
        data,
        false
      );
    } catch (err) {
      return response.response(res, 500, "", error.details[0].message, true);
    }
  }
};
