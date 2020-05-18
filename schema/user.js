/** @format */

const Sequelize = require("sequelize");

const user = sequelize.define(
  "User",
  {
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    age: {
      type: Sequelize.INTEGER
    },
    password: {
      type: Sequelize.STRING
    },
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey : true
    }
  },
  {
    timestamps: true,
  }
);
module.exports = user;
