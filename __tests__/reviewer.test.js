const { prepare } = require('../lib/data-helper/data-helper');

const request = require('supertest');
const app = require('../lib/app');

const Reviewer = require('../lib/models/Reviewer');

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
});
