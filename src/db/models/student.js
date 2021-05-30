"use strict";
const Model = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Students = sequelize.define("Students", {
    name: { type: DataTypes.STRING, allownull: false },
  });

  Students.associate = function (models) {};
  return Students;
};
