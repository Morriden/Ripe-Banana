const { prepare } = require('../lib/data-helper/data-helper');

const request = require('supertest');
const app = require('../lib/app');

const Film = require('../lib/models/Film');
const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');

describe('Film Routes', () => {
    
  it('gets all films via GET', async() => {
    const films = prepare(await Film.find().select({ title: true, released: true }).populate('studio', { name: true }));
    return request(app)
      .get('/api/v1/films')
      .then(res => {
        expect(res.body).toEqual(films);
      });
  });

  it('gets a film via get id', async() => {
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

  it('creates a film by the post route', async() => {
    const studio = prepare(await Studio.findOne());
    const actor = prepare(await Actor.findOne());

    return request(app)
      .post('/api/v1/films')
      .send({
        title: 'Movie',
        released: 1990,
        cast: [{
          actor: actor.id,
          role: 'Heroine'
        }],
        studio: studio.id
      })
      .then(res => {
        expect(res.body).toEqual({
          __v: 0,
          _id: expect.anything(),
          title: 'Movie',
          released: 1990,
          cast: [{
            _id: expect.anything(),
            actor: actor.id,
            role: 'Heroine'
          }],
          id: expect.anything(),
          studio: studio.id
        });
      });
  });
});
