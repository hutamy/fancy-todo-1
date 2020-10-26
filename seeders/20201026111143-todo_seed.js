'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Todos', [{
     title: "coding",
     description: "finishing tasks",
     status: "incomplete",
     due_date: new Date(),
     createdAt: new Date(),
     updatedAt: new Date()
   },{
      title: "groceries shopping",
      description: "buy chicken",
      status: "incomplete",
      due_date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
   }
  ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Todos', null, {})
  }
};
