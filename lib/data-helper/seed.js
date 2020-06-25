require('dotenv').config();

const chance = require('chance').Chance();

const Studio = require('../models/Studio');
const Actor = require('../models/Actor');

module.exports = async({ studio = 3, actor = 10 } = {}) => {
  const createdStudio = await Studio.create([...Array(studio)].map(() => ({
    name: chance.company(),
    address: [{
      city: chance.city(),
      state: chance.state(),
      country: chance.country()
    }]
  })));

  const createdActor = await Actor.create([...Array(actor)].map(() => ({
    name: chance.name(),
    dob: chance.birthday(),
    pob: [{
      city: chance.city(),
      state: chance.state(),
      country: chance.country()
    }]
  })));
};
