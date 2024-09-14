const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Membership = db.define('Membership', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  category: {
    type: DataTypes.ENUM('regular', 'honorary'),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'suspended'),
    allowNull: false,
  },
});

exports.Membership = Membership;
