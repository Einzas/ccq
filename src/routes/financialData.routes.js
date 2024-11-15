const financialDataController = require('../controllers/financialData.controller');
const express = require('express');

const router = express.Router();

const financialDataMiddleware = require('../middlewares/financialData.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
router.use(authMiddleware.protect);

// routes
router.route('/').get(financialDataController.findAllFinancialData);

router.route('/').post(financialDataController.createFinancialData);

router
  .route('/:id')
  .get(
    financialDataMiddleware.validFinancialData,
    financialDataController.findOneFinancialData
  )
  .patch(
    financialDataMiddleware.validFinancialData,
    financialDataController.updateFinancialData
  )
  .delete(
    financialDataMiddleware.validFinancialData,
    financialDataController.deleteFinancialData
  );

module.exports = router;
