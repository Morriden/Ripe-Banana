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
});

module.exports = mongoose.model('Reviewer', reviewers);
