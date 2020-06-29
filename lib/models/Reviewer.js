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

//Find reviewers?
//Check if reviewer has any reviews?
//profit!

reviewers.statics.deleteReviewers = async function(id) {
  const foundReviews = await this.model('Review')
    .find({ reviewer: id });
  if(foundReviews.length === 0) {
    return this.findByIdAndDelete(id);
  } else {
    throw new Error('Reviewer Still Has Reviews');
  }
};

module.exports = mongoose.model('Reviewer', reviewers);
