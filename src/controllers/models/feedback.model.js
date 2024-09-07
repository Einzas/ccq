const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Feedback = db.define('Feedback', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  interestInCommissions: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  comments: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = Feedback;
