const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Business = db.define('Business', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  tradeName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  legalName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ruc: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    max: 13,
  },
  businessType: {
    type: DataTypes.ENUM('individual', 'society', 'cooperative', 'other'),
    allowNull: false,
  },
  incorporationDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  fiscalAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  businessEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  businessPhone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  socialMedia: {
    type: DataTypes.JSON, // Para guardar un objeto con redes sociales
    allowNull: true,
  },
  economicActivity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  businessSector: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productsServicesDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Business;
