const { prepare } = require('../lib/data-helper/data-helper');

const request = require('supertest');
const app = require('../lib/app');

const Actor = require('../lib/models/Actor');

describe('Actor routes', async() => {
    
  it('gets all actors via GET', async() => {
    const actors = prepare(await Actor.find().select({ name: true }));
    
    return request(app)
      .get('/api/v1/actors')
      .then(res => {
        expect(res.body).toEqual(actors);
      });
  });

  it('gets an actor by ID', async() => {
    const actor = prepare(await Actor
      .findOne()
      .populate('films', { title: true, released: true }));

    return request(app)
      .get(`/api/v1/actors/${actor._id}`)
      .then(res => {
        expect(res.body).toEqual(actor);
      });
  });

  it('posts an actor with the post route', async() => {
    return request(app)
      .post('/api/v1/actors/')
      .send({
        name: 'Bobby Hill',
        dob: '2020-01-01',
        pob: {
          city: 'Portland',
          state: 'Oregon',
          country: 'USA'
        }
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          name: 'Bobby Hill',
          dob: '2020-01-01T00:00:00.000Z',
          id: expect.anything(),
          pob: [{
            _id: expect.anything(),
            city: 'Portland',
            state: 'Oregon',
            country: 'USA'
          }],
          __v: 0
        });
      });
  });
});
