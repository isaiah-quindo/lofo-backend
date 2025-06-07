const mongoose = require('mongoose');
const slugify = require('slugify');
//const validator = require('validator');
//const User = require('./userModel');

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A Lost/Found item must have a name'],
      trim: true,
      maxlength: [
        50,
        'A Lost/Found item name must have less or equal then 40 characters',
      ],
    },
    slug: String,
    reward: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    images: {
      type: [String],
      default: '/img/items/default-item.jpg',
    },
    category: {
      type: [String],
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: 'An item must have at least one category',
      },
    },
    itemType: {
      type: String,
      required: [true, 'An item must have a type'],
      enum: {
        values: ['lost', 'found'],
        message: 'An item is either: lost or found only',
      },
    },
    date: {
      type: Date,
      required: [true, 'Please indicate when you found/lost the item'],
    },
    location: String,
    city: {
      type: String,
      required: [true, 'City is required'],
    },
    province: {
      type: String,
      required: [true, 'Province is required'],
    },
    contactType: String,
    contact: {
      type: String,
      required: [true, 'Please provide at least 1 contact information'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'An item must belong to user'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  {
    timestamps: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Create text index on name field
itemSchema.index({ name: 'text', description: 'text' });

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
itemSchema.pre('save', function (next) {
  // Only set createdAt if it's a new document
  if (this.isNew) {
    this.createdAt = new Date();
  }

  this.slug = `${slugify(this.name, {
    lower: true,
  })}-${this.id}`;
  next();
});

// ${this.createdAt
//   .toLocaleString('en-us', {
//     month: 'numeric',
//     day: 'numeric',
//     year: 'numeric',
//   })
//   .replace(/\//g, '-')}

// QUERY MIDDLEWARE

// tourSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'guides',
//     select: '-__v -passwordChangedAt',
//   });
//   next();
// });

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
