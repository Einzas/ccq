const documentController = require('../controllers/document.controller');
const express = require('express');

const router = express.Router();

const documentMiddleware = require('../middlewares/document.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
router.use(authMiddleware.protect);

// routes
router.route('/').get(documentController.findAllDocuments);

router.route('/').post(documentController.createDocument);

router
  .route('/:id')
  .get(documentMiddleware.validDocument, documentController.findOneDocument)
  .patch(documentMiddleware.validDocument, documentController.updateDocument)
  .delete(documentMiddleware.validDocument, documentController.deleteDocument);

module.exports = router;
