var faker = require('faker');
const db = require('../models/index')


const addFakeExperience = async (req, res) => {
  console.log('creating fake experiences into DB');
  experiences = []
  for (let i = 0; i < 3; i++) {
    console.log('entering 4loop');

    const randomTitle = faker.commerce.productAdjective()
    const randomWords = faker.lorem.words()
    const randomCity = faker.address.cityName();
    const randomImage = faker.image.imageUrl();
    const randomDescription = faker.commerce.productDescription()
    const randomPrice = faker.commerce.price().slice(0, -3)

    console.log("allExperiences: addExperience: ");
    try {
      console.log('ready to try... 🔍 ');
      
      const experience = await db.Experience.create(
        {
          title: randomTitle + ' ' + randomWords,
          description: randomDescription,
          location: randomCity,
          price: randomPrice,
          image: randomImage
        }
      );
      console.log('FakeExperience created: ', experience.dataValues)
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