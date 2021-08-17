var faker = require('faker');
const db = require('../models/index')

const getCoordinates = (loc) => {
  let Lon;
  let Lat;
  if (loc == 'Barcelona') {
    Lon = `41.4${faker.datatype.number(80000)}`
    Lat = `2.${faker.datatype.number(200000)}`
  } else if (loc == 'Copenhagen') {
    Lon = `55.${faker.datatype.number({
      'min': 600000,
      'max': 800000
    })}`
    Lat = `12.${faker.datatype.number({
      'min': 500000,
      'max': 700000
    })}`
  } else if (loc == 'Paris') {
    Lon = `49.${faker.datatype.number({
      'min': 800000,
      'max': 950000
    })}`
    Lat = `2.${faker.datatype.number({
      'min': 100000,
      'max': 500000
    })}`
  } else if (loc == 'London') {
    Lon = `51.${faker.datatype.number({
      'min': 300000,
      'max': 700000
    })}`
    Lat = `0.${faker.datatype.number({
      'min': 000000,
      'max': 600000
    })}`
  } else {
    Lon = faker.address.longitude()
    Lat = faker.address.latitude()
  }
  return [Lon, Lat]
}

const addFakeExperience = async (req, res) => {
  console.log('creating fake experiences into DB', req.params);
  const amount = req.params.amount
  const cities = ["Barcelona", "London", "Copenhagen", "Paris", "Twatt"]
  experiences = []
  for (let i = 0; i < amount; i++) {
    console.log('entering 4loop');

    var loc = cities[Math.floor(Math.random() * cities.length)];
    const randomTitle = faker.commerce.productAdjective()
    const randomWords = faker.lorem.words()
    const randomCity = loc //faker.address.cityName();
    const randomImage = faker.image.imageUrl();
    const randomDescription = faker.commerce.productDescription()
    const randomPrice = faker.commerce.price().slice(0, -3)
    const randomLon = getCoordinates(loc)[0]
    const randomLat = getCoordinates(loc)[1]
    const randomDateFrom = faker.date.past()
    const randomDateTo = faker.date.future();
    const randomNumber = faker.datatype.number(10);
    const randomUser = faker.datatype.number({
      'min': 1,
      'max': 10
    });
    console.log(randomLon, randomLat);


    try {
      const experience = await db.Experience.create(
        {
          title: randomTitle + ' ' + randomWords,
          description: randomDescription,
          location: randomCity,
          price: randomPrice,
          image: randomImage,
          lon: randomLon,
          lat: randomLat,
          from: randomDateFrom,
          to: randomDateTo,
          quantity: randomNumber,
          UserId: randomUser
        }
      );

      console.log('FakeExperience created in:                     ', loc, '\n', experience.dataValues)
      experiences.push(experience)
      // res.status(201).send(experiences);
    } catch (err) {
      console.log("allExperiences: err => ", err);
      res.status(400).json({
        err: err.message,
      });
    }
  };
  res.status(201).send(experiences);
}

module.exports = { addFakeExperience }