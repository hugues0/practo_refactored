"use strict";
const Model = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    username: { type: DataTypes.STRING, allownull: false },
    password: { type: DataTypes.STRING, allownull: false },
  });

  Users.associate = function (models) {};
  return Users;
};
