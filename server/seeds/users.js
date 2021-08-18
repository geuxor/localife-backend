var faker = require('faker');
const db = require('../models/index')

const addFakeUser = async (req, res) => {
  console.log('creating fake users into DB', req.params);
  const amount = req.params.amount
  let users = []
  let alphabet = "abcdefghijklmnopqrstuvwxyz"
  for (let i = 0; i < amount; i++) {

    let randomletter = Math.floor(Math.random() * alphabet.length)
    const randomCharacter = alphabet[randomletter ]
    alphabet = alphabet.replace(randomCharacter, '')
    console.log('alphabet:', alphabet);
    
    const randomEmail = `${randomCharacter}@${randomCharacter}.com`
    const randomFirstname = faker.name.firstName()
    const randomLastname = faker.name.lastName()
    const randomPassword = '1234'
    const randomPhone = faker.phone.phoneNumber()
    const randomCountry = faker.address.country()
    const randomAvatar = faker.internet.avatar()

    try {
      const user = await db.User.create(
        {
          email: randomEmail,
          password: randomPassword,
          firstname: randomFirstname,
          lastname: randomLastname,
          phone_number: randomPhone,
          country: randomCountry,
          avatar: randomAvatar,
        }
      );

      console.log('FakeUser created:                     ', user.dataValues)
      users.push(user)
      // res.status(201).send(users);
    } catch (err) {
      console.log('allUsers: err => ', err);
      res.status(400).json({
        err: err.message,
      });
    }
  }
  res.status(201).send(users);
}

module.exports = { addFakeUser }