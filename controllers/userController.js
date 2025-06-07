const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3-transform');
const sharp = require('sharp');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

const s3 = new AWS.S3({
  accessKeyId: process.env.BUCKETEER_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.BUCKETEER_AWS_SECRET_ACCESS_KEY,
  region: 'ap-southeast-2',
});

//const multerStorage = multer.memoryStorage();

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
      cb(null, { fieldName: 'Profile Photo' });
    },
    transforms: [
      {
        id: 'resized',
        key: function (req, file, cb) {
          cb(null, `user-${req.user.id}-${Date.now()}.jpeg`);
        },
        transform: function (req, file, cb) {
          cb(
            null,
            sharp().withMetadata().resize(500, 500).jpeg({ quality: 90 })
          );
        },
      },
    ],
  }),
  limits: { fileSize: 3000000 },
  fileFilter: multerFilter,
});

// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: process.env.BUCKETEER_BUCKET_NAME,
//     acl: 'public-read',
//     metadata: function (req, file, cb) {
//       cb(null, { fieldName: 'TESTING_META_DATA!' });
//     },
//     key: function (req, file, cb) {
//       cb(null, `user-${req.user.id}-${Date.now()}.png`);
//     },
//   }),
//   fileFilter: multerFilter,
// });

//const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadUserPhoto = upload.single('photo');

exports.getImageUrl = (req, res, next) => {
  req.file.filename = req.file.transforms[0].location;

  console.log(req.file.filename);

  next();
};

/*
exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('png')
    .png({ quality: 90 });

  console.log(req.file.filename);
  next();
});
*/

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword',
        400
      )
    );
  }

  // 2 Filter fields
  const filteredBody = filterObj(req.body, 'name', 'email');
  if (req.file) filteredBody.photo = req.file.filename;

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

// exports.createUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     data: 'This route is not yet defined! Please use /signup instead',
//   });
// };

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.createUser = factory.createOne(User);

// Do NOT update passwords with this!
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
