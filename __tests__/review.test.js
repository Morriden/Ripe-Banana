const { prepare } = require('../lib/data-helper/data-helper');

const request = require('supertest');
const app = require('../lib/app');
const Reviewer = require('../lib/models/Reviewer');
const Film = require('../lib/models/Film');

describe('Review routes', () => {
    
  it.only('posts a review with the post route', async() => {
    const reviewer = prepare(await Reviewer.findOne());
    const film = prepare(await Film.findOne());

    return request(app)
      .post('/api/v1/reviews/')
      .send({
        rating: 3,
        review: 'not bad',
        reviewer: reviewer.id,
        film: film.id
      })
      .then(res => {
        expect(res.body).toEqual({
          rating: 3,
          review: 'not bad',
          __v: 0,
          _id: expect.anything(),
          reviewer: reviewer.id,
          film: film.id,
          id: expect.anything()
        });
      });
  });
});
