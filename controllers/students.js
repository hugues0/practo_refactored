const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateStudent = require('../middlewares/studentvalidation');
const students = require('../models/studentsmodel');




module.exports =class studentsController{


    static async getAll (req,res){
        res.send(students);
    };

 static async postIn (req,res) {
      const { error } = validateStudent(req.body);
    if (error) return res.status(404).send(error.details[0].message);
        
    const student = {
        id: students.length +1,
        name: req.body.name
    };
    students.push(student);
    res.send(student);
        
 };

    static async getById(req,res) {
        const student = students.find(c => c.id === parseInt(req.params.id));
        if (!student) return res.status(404).send('student with the given id was not found in the database');
        res.send(student);
    };

    static async updateById (req,res) {
        const student = students.find (c =>c.id === parseInt (req.params.id));
        if (!student) return res.status(404).send('student with the given id was not found in the database');
    
        //const result = validateStudent(req.body);
        const { error } = validateStudent(req.body);
        if (error)return res.status(404).send(error.details[0].message);

        student.name = req.body.name;
        res.send(student);
     
    };

    static async deleteById(req,res)  {
        const student = students.find (c =>c.id === parseInt (req.params.id));
        if (!student) return res.status(404).send('student with the given id was not found in the database');
        const index = students.indexOf(student);
        students.splice (index,1);
        res.send(student);
    };

}



