const philippines = require('philippines');
const fetch = require('node-fetch');
const url = require('url');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Item = require('../models/itemModel');

const cspContent =
  ";default-src * data: blob: 'unsafe-inline' 'unsafe-eval';connect-src http: ws: wss: 'unsafe-inline' 'unsafe-eval' data: blob: ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src * data: blob: 'unsafe-inline' 'unsafe-eval';object-src 'none';script-src * data: blob: 'unsafe-inline' 'unsafe-eval'; script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;";

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const foundItems = await Item.find({ itemType: 'found' });
  const lostItems = await Item.find({ itemType: 'lost' });

  // 2) Build template
  // 3) Render that template using the tour data from step 1
  res
    .status(200)
    .set('Content-Security-Policy', cspContent)
    .render('overview', {
      title: 'Home',
      foundItems,
      lostItems,
    });
});

exports.getItems = catchAsync(async (req, res, next) => {
  // 1) get the data for the requested tour (includes reviews and tour guides)
  const item = await Item.findOne({ slug: req.params.slug }).populate({
    path: 'user',
  });

  if (!item) {
    return next(new AppError('There is no item with that url.', 404));
  }
  // 2) Build template

  // 3) Render template using the data from step 1
  res
    .status(200)
    .set('Content-Security-Policy', cspContent)
    .render('item', {
      title: `| ${item.name}`,
      item,
    });
});

exports.getLoginForm = (req, res) => {
  res.status(200).set('Content-Security-Policy', cspContent).render('login', {
    title: 'Login to your account',
  });
};

exports.getSignupForm = (req, res) => {
  res.status(200).set('Content-Security-Policy', cspContent).render('signup', {
    title: 'Sign up',
  });
};

exports.getAccount = (req, res) => {
  res.status(200).set('Content-Security-Policy', cspContent).render('account', {
    title: 'My account',
  });
};

exports.getMyItems = catchAsync(async (req, res, next) => {
  // Find all bookings
  const items = await Item.find({ user: req.user.id });

  res.status(200).set('Content-Security-Policy', cspContent).render('myItems', {
    title: 'My Items',
    items,
  });
});

exports.reportItem = (req, res) => {
  const { cities, provinces } = philippines;

  res
    .status(200)
    .set('Content-Security-Policy', cspContent)
    .render('reportItem', {
      title: 'Report',
      itemType: req.params.itemType,
      cities,
      provinces,
    });
};

exports.getAllItems = catchAsync(async (req, res, next) => {
  const { cities, provinces } = philippines;
  const foundItems = await Item.find({ itemType: 'found' });
  const lostItems = await Item.find({ itemType: 'lost' });

  res.status(200).set('Content-Security-Policy', cspContent).render('viewAll', {
    title: 'View all items',
    itemType: req.params.itemType,
    foundItems,
    lostItems,
    provinces,
    cities,
  });
});

exports.search = catchAsync(async (req, res, next) => {
  const { cities, provinces } = philippines;
  const queryObject = url.parse(req.url, true).query;
  let category;
  if (queryObject.category) category = `&category=${queryObject.category}`;
  let city;
  if (queryObject.city) city = `&city=${queryObject.city}`;
  let province;
  if (queryObject.province) province = `&province=${queryObject.province}`;

  const endpoint = `http://lostandfound.ph/api/v1/items?itemType=${
    req.params.itemType
  }${category ? category : ''}${city ? city : ''}${province ? province : ''}`;

  const fetchItems = await fetch(`${endpoint}`)
    .then((response) => response.json())
    .then((data) => data.data);

  const items = fetchItems.data;

  res.status(200).set('Content-Security-Policy', cspContent).render('search', {
    title: 'View all items',
    itemType: req.params.itemType,
    provinces,
    cities,
    items,
  });
});

exports.categoryPets = catchAsync(async (req, res, next) => {
  const { cities, provinces } = philippines;
  const items = await Item.find({ category: 'Pets' });

  const fbPreviewImage = 'pets-preview.jpg';
  const coverImage = 'pets-cover.png';

  res
    .status(200)
    .set('Content-Security-Policy', cspContent)
    .render('category', {
      title: 'Pets',
      itemType: req.params.itemType,
      fbPreviewImage,
      coverImage,
      provinces,
      cities,
      items,
    });
});
