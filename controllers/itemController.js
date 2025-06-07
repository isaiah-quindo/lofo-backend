const dotenv = require('dotenv');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3-transform');
const sharp = require('sharp');
const Item = require('../models/itemModel');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

dotenv.config({ path: './config.env' });

// Configure AWS
AWS.config.update({
  accessKeyId: process.env.BUCKETEER_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.BUCKETEER_AWS_SECRET_ACCESS_KEY,
  region: process.env.BUCKETEER_AWS_REGION || 'ap-southeast-2',
});

const s3 = new AWS.S3();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please only upload images.', 400), false);
  }
};

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKETEER_BUCKET_NAME,
    acl: 'public-read',
    shouldTransform: function (req, file, cb) {
      cb(null, /^image/i.test(file.mimetype));
    },
    metadata: function (req, file, cb) {
      cb(null, { fieldName: 'Item Images' });
    },
    transforms: [
      {
        id: 'resized',
        key: function (req, file, cb) {
          cb(null, `item/${req.body.name}-${Date.now()}.jpeg`);
        },
        transform: function (req, file, cb) {
          cb(
            null,
            sharp().withMetadata().resize(538, 360).jpeg({ quality: 90 })
          );
        },
      },
    ],
  }),
  limits: { fileSize: 3000000 },
  fileFilter: multerFilter,
});

exports.uploadItemImages = upload.array('images', 3);

exports.getItemImages = async (req, res, next) => {
  if (!req.files) return next();

  const transformsArray = await req.files.map((file) => file.transforms);

  const locationArray = await transformsArray.map((subarray) =>
    subarray.find((file) => file.location)
  );

  req.body.images = locationArray.map((file) => file.location);

  next();
};

exports.getAllItems = factory.getAll(Item);
exports.getItem = factory.getOne(Item, { path: 'user' });
exports.createItem = factory.createOne(Item);
exports.updateItem = factory.updateOne(Item);
exports.deleteItem = factory.deleteOne(Item);
