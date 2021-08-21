var faker = require('faker');
const db = require('../models/index')

const getCoordinates = (loc) => {
  let Lon;
  let Lat;
  if (loc == 'Barcelona') {
    Lat = `41.4${faker.datatype.number(80000)}`
    Lon = `2.${faker.datatype.number(200000)}`
  } else if (loc == 'Copenhagen') {
    Lat = `55.${faker.datatype.number({
      'min': 600000,
      'max': 800000
    })}`
    Lon = `12.${faker.datatype.number({
      'min': 500000,
      'max': 700000
    })}`
  } else if (loc == 'Paris') {
    Lat = `49.${faker.datatype.number({
      'min': 800000,
      'max': 950000
    })}`
    Lon = `2.${faker.datatype.number({
      'min': 100000,
      'max': 500000
    })}`
  } else if (loc == 'London') {
    Lat = `51.${faker.datatype.number({
      'min': 300000,
      'max': 700000
    })}`
    Lon = `0.${faker.datatype.number({
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
  const cities = ['Barcelona', 'London', 'Copenhagen', 'Paris', 'Twatt']
  const countries = ['Spain', 'UK', 'Denmark', 'France', 'Scotland']
  let experiences = []
  for (let i = 0; i < amount; i++) {
    console.log('entering 4loop');

    var locCity = cities[Math.floor(Math.random() * cities.length)];
    var locCountry = cities[Math.floor(Math.random() * countries.length)];
    const randomTitle = faker.commerce.productAdjective()
    const randomWords = faker.lorem.words()
    const randomCity = locCity //faker.address.cityName();
    const randomCountry = locCountry //faker.address.cityName();
    const randomImage = faker.image.imageUrl();
    const randomDescription = faker.commerce.productDescription()
    const randomPrice = faker.commerce.price().slice(0, -3)
    const randomLon = getCoordinates(locCity)[0]
    const randomLat = getCoordinates(locCity)[1]
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
          city: randomCity,
          country: randomCountry,
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

      console.log('FakeExperience created in:                     ', locCity, '\n', experience.dataValues)
      experiences.push(experience)
      // res.status(201).send(experiences);
    } catch (err) {
      console.log('allExperiences: err => ', err);
      res.status(400).json({
        err: err.message,
      });
    }
  }
  res.status(201).send(experiences);
}

const destroyAllExperiences = async (req, res) => {
  db.Experience.destroy({
    where: {},
    truncate: true
  })
  console.log('Experience Table is now empty');
  res.json('all gone')
}

const updateStripe = async (req, res) => {
  let userid;
  try {
    const dbRes = await db.User.findOne({
      where: {
        email: 'a@a.aaa'
      }
    })

    if (!dbRes) {
      const dbCreate = await db.User.create({
        email: 'a@a.aaa',
        password: '$2b$10$IAnC8UWPv/4P1720X5JE8Ou/vVFuyNV6mYiLGTzC2C5iH9ti0L0aq',
        firstname: 'Evans',
        lastname: 'Schumm',
        phone_number: '1-773-796-4543',
        country: 'Yemen',
        avatar: 'https://cdn.fakercloud.com/avatars/uxpiper_128.jpg',
        stripe_session_id: null,
        stripe_registration_complete: true,
        // stripe_account_id: 'acct_1JQtneRf7VatYAmJ'
      })
      console.log('dbCreate', dbCreate.id);
      
      //updating Stripe Table
      const stripeUpdateResult = await db.StripeData.create(
        {
          stripe_account_id: 'acct_1JQtneRf7VatYAmJ',
          stripe_user_id: dbCreate.id
        })
      await stripeUpdateResult.setUser(dbCreate.id)
        
      userid = dbCreate.id
    } else {
      console.log('user already exists');
      console.log('dbres:', dbRes.id);
      userid = dbRes.id
    }
    const updateXps = await db.Experience.update({ UserId: userid },
      {
        where: { location: 'Copenhagen' },
        plain: true
      })
    console.log('experience updated :', updateXps);
    console.log('ALL OK: login as: any user and book an xp in Copenhagen - provider is a@a.aaa 1234');
    res.status(200).send('ALL OK: login as any user and book an xp in Copenhagen - provider is a@a.aaa 1234')
  } catch (err) {
    console.log(err);

  }
}

module.exports = { addFakeExperience, destroyAllExperiences, updateStripe }