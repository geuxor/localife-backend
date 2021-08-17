var faker = require('faker');
const db = require('../models/index')

const addFakeUser = async (req, res) => {
  console.log('creating fake users into DB', req.params);
  const amount = req.params.amount
  users = []
  for (let i = 0; i < amount; i++) {
    const randomEmail = faker.internet.email();
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
      console.log("allUsers: err => ", err);
      res.status(400).json({
        err: err.message,
      });
    }
  };
  res.status(201).send(users);
}

module.exports = { addFakeUser }