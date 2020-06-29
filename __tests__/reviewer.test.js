const { prepare } = require('../lib/data-helper/data-helper');

const request = require('supertest');
const app = require('../lib/app');

const Reviewer = require('../lib/models/Reviewer');
const Review = require('../lib/models/Review');
const Film = require('../lib/models/Film');

describe('Reviewer routes', async() => {

  it('gets all reviewers via GET', async() => {
    const reviewers = prepare(await Reviewer.find());
    
    return request(app)
      .get('/api/v1/reviewers')
      .then(res => {
        expect(res.body).toEqual(reviewers);
      });
  });

  it('gets a reviewer by ID', async() => {
    const reviewer = prepare(await Reviewer.findOne());

    return request(app)
      .get(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual(reviewer);
      });
  });

  it('creates a reviewer with post route', async() => {
    return request(app)
      .post('/api/v1/reviewers/')
      .send({
        name: 'Erik',
        company: 'alchemy'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          name: 'Erik',
          company: 'alchemy',
          __v: 0,
          id: expect.anything()
        });
      });
  });

  it('updates a reviewer with the patch route', async() => {
    const reviewer = prepare(await Reviewer.findOne());

    return request(app)
      .patch(`/api/v1/reviewers/${reviewer._id}`)
      .send({
        name: 'Max',
        company: 'Awesome'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          name: 'Max',
          company: 'Awesome',
          __v: 0,
          id: expect.anything()
        });
      });
  });

  it('deletes a user with no reviews', async() => {
    const reviewer = await Reviewer.create({
      name: 'Erik',
      company: 'Alchemy',
    });
    return request(app)
      .delete(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          name: 'Erik',
          company: 'Alchemy',
          __v: 0,
          id: expect.anything()
        });
      });
  });

  it('It fails to delete a user because they have reviews', async() => {
    const film = prepare(await Film.findOne());
    
    const reviewer = await Reviewer.create({
      name: 'Erik',
      company: 'Alchemy',
    });
    const review = await Review.create({
      reviewer: reviewer._id,
      film: film._id,
      rating: 1,
      review: 'Sucks badly'
    });
    return request(app)
      .delete(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual({
          message: 'Reviewer Still Has Reviews', 'status': 500
        });
      });
  });
});
