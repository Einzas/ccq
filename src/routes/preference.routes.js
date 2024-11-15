const preferenceController = require('../controllers/preference.controller');
const express = require('express');

const router = express.Router();

const preferencesMiddleware = require('../middlewares/preferences.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
router.use(authMiddleware.protect);

// routes
router.route('/').get(preferenceController.findAllPreferences);

router.route('/').post(preferenceController.createPreference);

router
  .route('/:id')
  .get(
    preferencesMiddleware.validPreference,
    preferenceController.findOnePreference
  )
  .patch(
    preferencesMiddleware.validPreference,
    preferenceController.updatePreference
  )
  .delete(
    preferencesMiddleware.validPreference,
    preferenceController.deletePreference
  );

module.exports = router;
