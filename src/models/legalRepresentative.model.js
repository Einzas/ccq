const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const LegalRepresentative = db.define('LegalRepresentative', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  identificationNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  contactPhone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = LegalRepresentative;
