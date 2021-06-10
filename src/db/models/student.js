"use strict";
import Model from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  const student = sequelize.define("student", {
    name: { type: DataTypes.STRING, allownull: false },
  });

  student.associate = function (models) {};
  return student;
};
