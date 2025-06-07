const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
//const bookingController = require('../controllers/bookingController');

const router = express.Router();

//router.use(viewsController.alerts);

router.get('/', authController.isLoggedIn, viewsController.getOverview);

router.get('/item/:slug', authController.isLoggedIn, viewsController.getItems);

router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/signup', authController.isLoggedIn, viewsController.getSignupForm);
router.get('/account', authController.protect, viewsController.getAccount);

router.get('/my-items', authController.protect, viewsController.getMyItems);

router.get(
  '/report/:itemType',
  authController.isLoggedIn,
  viewsController.reportItem
);

router.get(
  '/view/:itemType',
  authController.isLoggedIn,
  viewsController.getAllItems
);
router.get(
  '/view/:itemType/search',
  authController.isLoggedIn,
  viewsController.search
);

router.get('/pets', authController.isLoggedIn, viewsController.categoryPets);

/*
router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData
);
*/
module.exports = router;
