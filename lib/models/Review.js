const mongoose = require('mongoose');

const reviews = new mongoose.Schema({
  reviewer: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Reviewer',
    required: true
  },
  film: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Film',
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  review: {
    type: String,
    required: true,
    maxLength: 256
  }
}, {
  toJSON: {
    virtuals: true
  }
});

module.exports = mongoose.model('Review', reviews);
