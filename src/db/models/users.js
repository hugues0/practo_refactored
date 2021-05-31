"use strict";
const Model = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define("user", {
    username: { type: DataTypes.STRING, allownull: false },
    password: { type: DataTypes.STRING, allownull: false },
  });

  user.associate = function (models) {};
  return user;
};
