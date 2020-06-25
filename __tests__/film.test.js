const { prepare } = require('../lib/data-helper/data-helper');

const request = require('supertest');
const app = require('../lib/app');

const Film = require('../lib/models/Film');

describe('Film Routes', async() => {
    
  it('gets all films via GET', async() => {
    const films = prepare(await Film.find().select({ title: true, released: true }).populate('studios.name'));
    console.log(films);
    return request(app)
      .get('/api/v1/films')
      .then(res => {
        expect(res.body).toEqual(films);
      });
  });
});
