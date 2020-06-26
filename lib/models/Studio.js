const mongoose = require('mongoose');
const films = require('../routes/films');

const addressSchema = new mongoose.Schema({
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

const studios = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: [addressSchema]
}, {
  toJSON: {
    virtuals: true
  }
});

studios.virtual('films', {
  ref: 'Film',
  localField: '_id',
  foreignField: 'studio'
});

module.exports = mongoose.model('Studio', studios);
