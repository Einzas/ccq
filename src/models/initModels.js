const Business = require('./business.model');
const LegalRepresentative = require('./legalRepresentative.model');
const Membership = require('./membership.model');
const FinancialData = require('./financialData.model');
const Preferences = require('./preferences.model');
const Document = require('./document.model');
const Feedback = require('./feedback.model');
const User = require('./user.model');

const initModel = () => {
  User.hasOne(Business);
  Business.belongsTo(User);

  User.hasOne(LegalRepresentative);
  LegalRepresentative.belongsTo(User);

  User.hasOne(Membership);
  Membership.belongsTo(User);

  User.hasMany(FinancialData);
  FinancialData.belongsTo(User);

  User.hasMany(Preferences);
  Preferences.belongsTo(User);

  User.hasMany(Document);
  Document.belongsTo(User);

  User.hasMany(Feedback);
  Feedback.belongsTo(User);
};
module.exports = initModel;
