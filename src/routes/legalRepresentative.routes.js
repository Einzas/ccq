const legalRepresentativeController = require('../controllers/legalRepresentative.controller');
const express = require('express');

const router = express.Router();

const legalRepresentativeMiddleware = require('../middlewares/legalRepresentative.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
router.use(authMiddleware.protect);

// routes
router
  .route('/')
  .get(legalRepresentativeController.findAllLegalRepresentatives);

router.route('/').post(legalRepresentativeController.createLegalRepresentative);

router
  .route('/:id')
  .get(
    legalRepresentativeMiddleware.validLegalRepresentative,
    legalRepresentativeController.findOneLegalRepresentative
  )
  .patch(
    legalRepresentativeMiddleware.validLegalRepresentative,
    legalRepresentativeController.updateLegalRepresentative
  )
  .delete(
    legalRepresentativeMiddleware.validLegalRepresentative,
    legalRepresentativeController.deleteLegalRepresentative
  );

module.exports = router;
