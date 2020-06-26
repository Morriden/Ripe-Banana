require('dotenv').config();

const chance = require('chance').Chance();

const Studio = require('../models/Studio');
const Actor = require('../models/Actor');
const Reviewer = require('../models/Reviewer');
const Film = require('../models/Film');
const Review = require('../models/Review');

module.exports = async({ studio = 3, actor = 10, reviewer = 20, film = 30, review = 20 } = {}) => {
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

  const createdReviewer = await Reviewer.create([...Array(reviewer)].map(() => ({
    name: chance.name(),
    company: chance.company(),
  })));

  const createdFilm = await Film.create([...Array(film)].map(() => ({
    title: `${chance.color()} + ${chance.animal()}`,
    released: parseInt(chance.year()),
    studio: chance.pickone(createdStudio)._id,
    cast: chance.pickset(createdActor, chance.natural({ min: 2, max: 5 }))
      .map(({ _id }) => ({
        actor: _id,
        role: chance.name()
      }))
  })));

  await Review.create([...Array(review)].map(() => ({
    reviewer: chance.pickone(createdReviewer)._id,
    film: chance.pickone(createdFilm)._id,
    rating: chance.natural({ min: 1, max: 5 }),
    review: chance.paragraph({ sentence: 2 })
  }))
  );
};
