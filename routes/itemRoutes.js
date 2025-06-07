const express = require('express');
const itemController = require('../controllers/itemController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(itemController.getAllItems)
  .post(
    authController.protect,
    itemController.uploadItemImages,
    itemController.getItemImages,
    itemController.createItem
  );

router
  .route('/:id')
  .get(itemController.getItem)
  .patch(
    authController.protect,
    itemController.uploadItemImages,
    itemController.getItemImages,
    itemController.updateItem
  )
  .delete(authController.protect, itemController.deleteItem);

module.exports = router;
