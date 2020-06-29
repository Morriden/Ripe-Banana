const { prepare } = require('../lib/data-helper/data-helper');

const request = require('supertest');
const app = require('../lib/app');
const Review = require('../lib/models/Review');
const Film = require('../lib/models/Film');

describe('Review routes', () => {
    
  it('posts a review with the post route', async() => {
    const reviewer = prepare(await Review.findOne());
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

  it('deletes a review', async() => {
    const review = prepare(await Review.findOne());

    return request(app)
      .delete(`/api/v1/reviews/${review._id}`)
      .then(res => {
        expect(res.body).toEqual(review);
      });
  });

  it('gets reviews with the get route, limited to 100 highest', async() => {
    const reviews = prepare(await Review
      .find()
      .limit(100)
      .sort({ 'rating': -1 })
    );

    return request(app)
      .get('/api/v1/reviews')
      .then(res => {
        expect(res.body).toEqual(reviews);
      });
  });
});
