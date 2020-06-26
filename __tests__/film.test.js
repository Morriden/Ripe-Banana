const { prepare } = require('../lib/data-helper/data-helper');

const request = require('supertest');
const app = require('../lib/app');

const Film = require('../lib/models/Film');

describe('Film Routes', () => {
    
  it('gets all films via GET', async() => {
    const films = prepare(await Film.find().select({ title: true, released: true }).populate('studio', { name: true }));
    return request(app)
      .get('/api/v1/films')
      .then(res => {
        expect(res.body).toEqual(films);
      });
  });

  it.only('gets a film via get id', async() => {
    const film = prepare(await Film
      .findOne()
      .populate('studio', { name: true })
      .populate('cast.actor', { name: true })
      .populate({
        path: 'review',
        select: { rating: true, review: true, reviewer: true },
        populate: { path: 'reviewer', select: { name: true } }
      })
    );
    return request(app)
      .get(`/api/v1/films/${film._id}`)
      .then(res => {
        expect(res.body).toEqual(film);
      });
  });
});
