const db = require('../models/index')

const addBooking = async (req, res) => {
  console.log('addBooking: ', req.body)
  try {
    const booking = await db.Booking.create(req.body);
    console.log('addBooking: updated with ', booking.dataValues)
    res.status(201).json(booking);
  } catch (err) {
    console.log('addBooking: err => ', err);
    res.status(400).json({
      err: err.message,
    });
  }
};

const mineBookings = async (req, res) => {
  const user = req.user
  console.log('mineBookings: => ', user);
  try {
    const bookings = await db.Booking.findAll({ where: { UserId: user.id },
      include: {
        model: db.Experience,
        attributes: ['title', 'description', 'price', 'image', 'city', 'country']
      } });
    res.status(201).json(bookings);
  } catch (err) {
    console.log('mineBookings: err => ', err);
    res.status(400).json({
      err: err.message,
    });
  }
}


module.exports = { addBooking, mineBookings }
