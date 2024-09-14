const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const FinancialData = db.define('FinancialData', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  preferredPaymentMethod: {
    type: DataTypes.ENUM('bank_transfer', 'credit_card', 'other'),
    allowNull: false,
  },
  bankAccountNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = FinancialData;
