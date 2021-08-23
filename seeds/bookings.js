var faker = require('faker');
const db = require('../models/index')
const moment = require('moment')

const addFakeBookings = async (req, res) => {
  console.log('creating fake bookings into DB', req.params);
  const amount = req.params.amount
  let bookings = []
  for (let i = 0; i < amount; i++) {
    const randomPrice = faker.commerce.price().slice(0, -3)
    const randomDateFrom = faker.date.future()
    // var today = moment();
    var tomorrow = moment(randomDateFrom).add(10, 'days');
    console.log('xxxxxxx', tomorrow.toDate())
    const randomDateTo = tomorrow.toDate()
    const randomNumber = faker.datatype.number(10);
    const randomTotal = faker.datatype.number({
      'min': 200,
      'max': 1000
    });
    const randomUser = faker.datatype.number({
      'min': 1,
      'max': 4
    });
    const randomExperience = faker.datatype.number({
      'min': 1,
      'max': 4
    });

    let newBooking = {
      start_date: randomDateFrom,
      end_date: randomDateTo,
      price: randomPrice,
      quantity: randomNumber,
      total: randomTotal,
      UserId: randomUser,
      ExperienceId: randomExperience
    }
    console.log('-------------------------------------');
    console.log(newBooking);

    try {
      const res = await db.Booking.create(newBooking);
      console.log('FakeBookings created in:', res.dataValues)
      bookings.push(res)
      // res.status(201).send('all ok');
    } catch (err) {
      console.log('addFakeBookings: err => ', err);
      res.status(400).json({
        err: err.message,
      });
    }
  }
  res.status(201).send('all ok');
}

const destroyAllBookings = async (req, res) => {
  db.Booking.destroy({
    where: {},
    truncate: true
  })
  console.log('Booking Table is now empty');
  res.json('all bookings are gone')
}

module.exports = { addFakeBookings, destroyAllBookings }