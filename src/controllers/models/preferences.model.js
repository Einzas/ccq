const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Preferences = db.define('Preferences', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  communicationPreference: {
    type: DataTypes.ENUM('email', 'sms', 'calls'),
    allowNull: false,
  },
  eventInterests: {
    type: DataTypes.JSON, // Para almacenar intereses en eventos
    allowNull: true,
  },
  collaborationAreas: {
    type: DataTypes.JSON, // Para almacenar áreas de colaboración
    allowNull: true,
  },
});

module.exports = Preferences;
