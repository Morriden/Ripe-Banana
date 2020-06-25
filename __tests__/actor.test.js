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

  
});