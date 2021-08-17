var faker = require('faker');

function getXps(params) {
  console.log('ready to fake it!', params);
  
  let experiences = [];

  for (let i = 0; i < params.amount; i++) {
    const randomTitle = faker.commerce.productAdjective()
    const randomWords = faker.lorem.words()
    var randomCity = faker.address.cityName();
    var randomImage = faker.image.imageUrl();
    const randomDescription = faker.commerce.productDescription()
    const randomPrice = faker.commerce.price()
    experiences.push({
      title: randomTitle + ' ' + randomWords,
      description: randomDescription,
      location: randomCity,
      price: randomPrice,
      image: randomImage
    })
  }
  return experiences;
}

module.exports = getXps