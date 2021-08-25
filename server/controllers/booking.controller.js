const db = require('../models/index')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function createBooking(req, res) {
  console.log('createBooking: - buying experienceId: ', req.body);

  const user = req.user
  const experience = req.body.experience
  const start_date = req.body.start_date
  const fee = (experience.price * process.env.STRIPE_PLATFORM_FEE)
  console.log(fee);

  // createa a session
  try {
    //find user.account_id for the experience.id
    const provider = await db.User.findOne({
      where: {
        id: experience.UserId
      }
    })
    console.log('createBooking: found a user for this experience:', provider.stripe_account_id);
    //save xp id to user buying the xp
    if (!provider.stripe_account_id) throw Error('ERR:Experience is not bookable as Stripe_account not found for provider')
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      //missing picture!!!
      line_items: [{
        price_data: {
          product_data: {
            name: experience.title
          },
          unit_amount: experience.price * 100,
          currency: 'eur'
        },
        quantity: 1
      }],
      mode: 'payment',
      payment_intent_data: {
        application_fee_amount: fee,
        transfer_data: {
          destination: provider.stripe_account_id
        },
      },
      success_url: `${process.env.STRIPE_SUCCESS_URL}/${experience.id}`,
      cancel_url: process.env.STRIPE_FAILURE_URL
    });
    console.log('session ===========================>', session);

    const newBooking = { sessionId: session.id, ExperienceId: experience.id, UserId: user.id, providerId: experience.UserId, start_date: start_date }
    console.log('--------------------- newBooking', newBooking);

    const newBookingRes = await addBookingData(newBooking)
    console.log('newBookingRes Response', newBookingRes.dataValues);

    const updatedStripeSessionId = await db.User.update({ stripe_session_id: session.id },
      {
        where: { id: user.id },
        plain: true
      })

    console.log('User with id: ', user.id, ' updated stripe_session_id: ', updatedStripeSessionId)
    // send session id to client to finalize payment
    res.status(200).json({ sessionId: session.id }) // experience: experience
  } catch (err) {
    console.log(err.message);
    res
      .status(400)
      .send(err.message);
  }

}

const bookingSuccess = async (req, res) => {
  console.log('bookingSuccess req', req.body);

  const user = req.user
  console.log('userId:', user.dataValues.id, '\n with Stripe session:', user.stripe_session_id, ' \n provider registration complete:', user.stripe_registration_complete);
  try {
    if (!user.stripe_session_id) throw new Error('Your Session is no longer valid!')
    const session = await stripe.checkout.sessions.retrieve(
      user.stripe_session_id
    );
    console.log('ID:', session.id, '\n -- res from stripe:', session);
    if (session.payment_status === 'paid') {
      console.log('bookingSuccess sessionId:', user.stripe_session_id);
      const updateBooking = await db.Booking.update(
        {
          total: session.amount_total,
          status: session.payment_status
        },
        {
          where: { sessionId: user.stripe_session_id },
          returning: true,
          plain: true
        })

      console.log('updateBooking ****************', updateBooking[1].dataValues)
      //before this check if provider is = provider from db??!!!!
      const updateProvider = await db.StripeData.increment(
        {
          lifetime_volume: +session.amount_total
        },
        {
          where: { stripe_user_id: updateBooking[1].providerId },
          returning: true,
          plain: true
        })

      console.log('updateProvider***************', updateProvider);
      // remove user's stripeSession
      const updatedStripeSessionId = await db.User.update({ stripe_session_id: '' },
        {
          where: { id: user.id },
          returning: true,
          plain: true
        })
      console.log('Session id deleted from user data: ', updatedStripeSessionId);

      res.json({ success: true });
    } else {
      console.log('stripe payment check failre - status is still unpaid');
      res.json({ success: false });
    }
  } catch (err) {
    console.log('bookingSuccess:', err);
    err.raw && err.raw.message ? err['stripe'] = err.raw.message : err['stripe'] = 'unknown'
    res.status(500).send({ message: err.message, stripe: err.stripe })
  }
};

const addBookingData = async (data) => {
  console.log('addBooking: ', data)
  try {
    const booking = await db.Booking.create(data);
    console.log('addBooking: updated with ', booking.dataValues)
    return booking;
  } catch (err) {
    console.log('addBooking: err => ', err);
    return { err: err.message }
  }
}


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

const getOneBooking = async (req, res) => {
  console.log('getOneBooking:', req.params);
  console.log('getOneBooking:', req.user);
  console.log('getOneBooking:', req.body);

  try {
    const experience = await db.Booking.findOne({
      where: req.params,
      // returning: true,
      // plain: true
      include: {
        model: db.Experience,
        attributes: ['title', 'subtitle'],
        include: {
          model: db.User,
          attributes: ['firstname', 'avatar']
        }
      }
    });
    console.log('Found your Booking: ', experience.dataValues);
    res.status(200).json(experience)
  } catch (err) {
    console.log('getOneExperiences: err => ', err);
    res.status(400).json({
      err: err.message,
    });
  }
}



const mineBookings = async (req, res) => {
  const user = req.user
  console.log('mineBookings: => ', user);
  try {
    const bookings = await db.Booking.findAll({
      where: { UserId: user.id },
      include: {
        model: db.Experience,
        attributes: ['title', 'subtitle', 'price', 'image', 'city', 'country']
      },
    });
    console.log('I found ', bookings.length, ' bookings belonging to the signed in user');
    if (!bookings.length) throw new Error('No Bookings found for user')
    res.status(201).json(bookings);
  } catch (err) {
    console.log('mineBookings: err => ', err);
    res.status(400).json({
      err: err.message,
    });
  }
}


module.exports = { addBooking, mineBookings, getOneBooking, addBookingData, createBooking, bookingSuccess }
