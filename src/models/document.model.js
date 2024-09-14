const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Document = db.define('Document', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  documentType: {
    type: DataTypes.STRING, // cédula, licencia, etc.
    allowNull: false,
  },
  documentUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Document;
