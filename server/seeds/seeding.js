const db = require('../models/index')
const mockUsers = require('./mockUsers.json')
const mockXps = require('./mockExperiences.json')
const mockBookings = require('./mockBookings.json')
const mockStripe = require('./mockStripe.json')
const fetch = require('node-fetch');
const seedingDb = async (req, res) => {

  try {
    const clear = await db.sequelize.sync({ force: true });
    console.log('Clearing Data...', clear)
    console.log('Creating DATA...')
    const endpoint = process.env.NODE_ENV === 'development' ? 'http://localhost:4001/register' : 'https://localife.herokuapp.com/register'
    for (let i = 0; i < mockUsers.length; i++) {
      let user = mockUsers[i]

      let seedRes = await fetch(endpoint, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      })
      console.log('=========>', seedRes.status);
    }

    console.log('Users Created', mockUsers.length);
    const dbExperiences = await db.Experience.bulkCreate(mockXps)
    console.log('Experiences Created: ', dbExperiences.length);
    const dbBookings = await db.Booking.bulkCreate (mockBookings)
    console.log('Bookings Created: ', dbBookings.length);
    const dbStripe = await db.StripeData.bulkCreate(mockStripe)
    console.log('StripeData Created: ', dbStripe.length);
    console.log('Seeds Creation finished!');
    res.status(200).send('Seeds Created')
  } catch (err) {
    console.log(err);
    res.status(500).send('Seeds NOT Created')
  }
}

module.exports = { seedingDb }