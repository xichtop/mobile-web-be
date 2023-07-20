const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');

// router.param('id', productController.checkID);

router
  .route('/top-sold').get(authController.protect, productController.aliasTopProduct, productController.getProducts);

router
 .route('/get-by-group').get(authController.protect, productController.getProductGroup);
router
 .route('/get-by-color').get(productController.getProductColor);

router
  .route('/')
  .get(productController.getProducts)
  .post(productController.createProduct);

router
  .route('/:id')
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);


module.exports = router;