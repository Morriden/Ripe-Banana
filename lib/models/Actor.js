const mongoose = require('mongoose');

const birthplaceSchema = new mongoose.Schema({
  city: {
    type: String
  },
  state: {
    type: String
  },
  country: {
    type: String
  }
});

const actors = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dob: {
    type: Date
  },
  pob: [birthplaceSchema]
}, {
  toJSON: {
    virtuals: true
  }
});

actors.virtual('films', {
  ref: 'Film',
  localField: '_id',
  foreignField: 'actor'
});

module.exports = mongoose.model('Actor', actors);
