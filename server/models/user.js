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
        // isEmail : 'Must be an email format', //hmm why
        // unique: 'Email has aready taken', kenapa jadi gabisa jalan ya hmm
        notEmpty: 'Email in required'
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [6],
        notEmpty: 'Password is required'
      }
    },
    full_name: {
      type: DataTypes.STRING,
      notEmpty: 'Full name is required'
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