const mongoose = require('mongoose');

const reviewers = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    virtuals: true
  }
});

reviewers.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'reviewers'
});

module.exports = mongoose.model('Reviewer', reviewers);
