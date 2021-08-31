const db = require('../models/index')
const mockUsers = require('./mockUsers.json')
const mockXps = require('./mockExperiences.json')
const mockBookings = require('./mockBookings.json')
const mockStripe = require('./mockStripe.json')

const seedingDb = async (req, res) => {

  console.log('seedingDb');

  try {
    const xStripe = await db.StripeData.destroy(({ truncate: { cascade: true } }))
    console.log('Stripe Table is now very empty:', xStripe);

    const xBkng = await db.Booking.destroy(({ truncate: { cascade: true } }))
    console.log('Bookings Table is now very empty:', xBkng);

    const xXps = await db.Experience.destroy(({ truncate: { cascade: true } }))
    console.log('Xp Table is now very empty:', xXps);

    const xUsrs = await db.User.destroy(({ truncate: { cascade: true } }))
    console.log('User Table is now very empty:', xUsrs);

    
    console.log('Creating data...');
    const dbUsers = await db.User.bulkCreate(mockUsers)
    console.log('Users Created: ', dbUsers);
    const dbExperiences = await db.Experience.bulkCreate(mockXps)
    console.log('Experiences Created: ', dbExperiences);
    const dbBookings = await db.Booking.bulkCreate (mockBookings)
    console.log('Bookings Created: ', dbBookings);
    const dbStripe = await db.Stripe.bulkCreate(mockStripe)
    console.log('StripeData Created: ', dbStripe);

    res.status(200).send('Seeds Created')
  } catch (err) {
    console.log(err);
    res.status(500).send('Seeds NOT Created')
  }
}

module.exports = { seedingDb }