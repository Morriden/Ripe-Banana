require('dotenv').config();

const chance = require('chance').Chance();

const Studio = require('../models/Studio');

module.exports = async({ studio = 3 } = {}) => {
  const createdStudio = await Studio.create([...Array(studio)].map(() => ({
    name: chance.company(),
    address: [{
      city: chance.city(),
      state: chance.state(),
      country: chance.country()
    }]
  })));
};
