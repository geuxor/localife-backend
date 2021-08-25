const { validateNewUser } = require('../utils/validate.user')
var faker = require('faker');
const db = require('../models/index')

const addFakeUser = async (req, res) => {
  const amount = req.params.amount
  let users = []
  let alphabet = "abcdefghijklmnopqrstuvwxyz"
  for (let i = 0; i < amount; i++) {
    console.log('creating fake users #', i,' into DB ====================>' );
    let randomletter = Math.floor(Math.random() * alphabet.length)
    const randomCharacter = alphabet[randomletter]
    alphabet = alphabet.replace(randomCharacter, '')

    const randomEmail = `${randomCharacter}@${randomCharacter}.com`
    const randomFirstname = faker.name.firstName()
    const randomLastname = faker.name.lastName()
    const randomPassword = '1234'
    const randomPhone = faker.phone.phoneNumber()
    const randomCountry = faker.address.country()
<<<<<<< HEAD
    const randomAvatar = faker.internet.avatar()
=======
    const randomAvatar = faker.internet.avatar()    
>>>>>>> 6428780270343c582a0719d6087c2f2c4f12f87b

    const validatedUserRes = await validateNewUser({ email: randomEmail, password: randomPassword, firstname: randomFirstname, lastname: randomLastname })
    validatedUserRes.phone_number = randomPhone
    validatedUserRes.country = randomCountry
    validatedUserRes.avatar = randomAvatar
    if (!validatedUserRes.email) console.log('Validation ERR response:', validatedUserRes);
    try {
      const user = await db.User.create(validatedUserRes);
      console.log('            🦞 FakeUser created for: ', user.firstname, user.lastname, 'id:', user.id, 'email:', user.email, 'password:', randomPassword)
      users.push(user)
    } catch (err) {
      console.log('allUsers: err => ', err);
      res.status(400).json({
        err: err.message,
      });
    }
  }
  res.status(201).send(users);
}

const destroyAllUsers = async (req, res) => {
  db.User.destroy({
    where: {},
    truncate: true
  })
  console.log('User Table is now empty');
  res.json('all gone')
}

module.exports = { addFakeUser, destroyAllUsers }