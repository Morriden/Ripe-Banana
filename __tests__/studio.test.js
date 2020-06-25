require('../lib/data-helper/data-helper');

const request = require('supertest');
const app = require('../lib/app');

const Studio = require('../lib/models/Studio');

describe('Studio routes', () => {
    
  it('gets all studios via GET', async() => {
    return request(app)
      .get('/api/v1/studios')
      .then(res => {
        expect(res.body).toEqual([{
                
        }]);
      });
  });


});
