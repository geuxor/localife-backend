//not being used
const { sequelize } = require('../models')
// const db = require('../models')
//npm run dev:seed

const mock = [
  {
    email: "e@e.eee",
    password: "1234",
    firstName: "Pepe",
    lastName: "Popo"
  },
  {
    email: "a@a.aaa",
    password: "1234",
    firstName: "Pepe",
    lastName: "Pipi"
  }
]

  (async () => {
    try {
      await sequelize.sync({ force: true });
      console.log('database synced :')
      db.user.bulkCreate(mock)
      console.log('users created');
      // db.messages.bulkCreate(mock)
      // console.log('msg created');
      process.exit(0)
    } catch (err) {
      console.log(err)
    }
  })();

