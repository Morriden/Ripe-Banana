const mongoose = require('mongoose');

const castSchema = new mongoose.Schema({
  actor: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Actor',
    required: true
  },
  role: {
    type: String
  },
});

const films = new mongoose.Schema({
  studio: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Studio',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  released: {
    type: Number,
    required: true
  },
  cast: [castSchema]
}, {
  toJSON: {
    virtuals: true
  }
});

module.exports = mongoose.model('Film', films);
