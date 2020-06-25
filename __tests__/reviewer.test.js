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
})