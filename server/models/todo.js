'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {
      Todo.belongsTo(models.User, {
        foreignKey: 'UserId'
      })
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: 'Title is required'
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: 'Description is required'
      }
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: 'Status is required'
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: 'Due date is required'
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};