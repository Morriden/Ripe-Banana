const { Router } = require('express');
const Film = require('../models/Film');

module.exports = Router()
  .get('/', (req, res, next) => {
    Film
      .find()
      .select({ title: true, released: true })
      .populate('studio', { name: true })
      .then(film => res.send(film))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Film
      .findById(req.params.id)
      .populate('studio', { name: true })
      .populate('cast.actor', { name: true })
      .populate({
        path: 'review',
        select: { rating: true, review: true, reviewer: true },
        populate: { path: 'reviewer', select: { name: true } }
      })
      .then(film => res.send(film))
      .catch(next);
  })
  .post('/', (req, res, next) => {
    Film
      .create(req.body)
      .then(film => res.send(film))
      .catch(next);
  });
