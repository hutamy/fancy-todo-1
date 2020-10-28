'use strict';
const {
  Model
} = require('sequelize');

const { hashPassword } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Todo)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail : {msg : 'Must be an email'},
        unique : {msg: 'Email must be unique'}
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [6]
      }
    }
  }, {
    hooks: {
      beforeCreate (User) {
        User.password = hashPassword(User.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};