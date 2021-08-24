<<<<<<< HEAD
const router = require('express').Router()
const authMiddleware = require('./middleware/auth.mw')

console.log(`\n💫 ROUTES..............................
>>SEEDS
get             /seed           => populate data to DB

=======
const router = require('express').Router();
const authMiddleware = require('./middleware/auth.mw');
const fileUploader = require('./configs/cloudinary.config')

console.log(`\n💫 ROUTES..............................
>>>>>>> feat: route for cloudinary + config
>>AUTH..........
post            /register
post            /login          => cookie is created
get             /logout         => cookie is destroyed
post            /profile        => relogin user

>>EXPERIENCES....
<<<<<<< HEAD
get             /search-result?country=Spain  => get result for any query   
post            /experiences/new              => create a new experience
get             /experiences                  => get all experiences

>>USERS..........
get             /users                        => get all users

>>BOOKINGS.......
get             /bookings                     => get all bookings

..............................\n`)

//faker
const { seedingDb } = require('./scripts/seeding')
router.get('/seed', seedingDb)
const seedsExperiences = require('./seeds/experiences')
router.get('/fake/experiences/:amount', seedsExperiences.addFakeExperience)
=======
get             /search-result?country=Spain  => get result for any query
get             /fake/experiences/:amount     => create new fake data in DB
post            /experiences/new              => create a new experience
get             /experiences                  => get all experiences
get             /destroy-experiences          => empties the Experience DB table
get             /xps                          => get fake data without hitting DB

>>USERS..........
get             /fake/users/"amount"          => stores fake data in DB
get             /destroy-users                => empties the User DB table
get             /users                        => get all users

>>BOOKINGS.......
get             /fake/bookings/:amount'       => stores fake data in DB
get             /destroy-bookings             => empties the Booking DB table

>>STRIPE.........
get             /update-stripe                => create provider with stripe acc.
..............................\n`);
//faker
const seedsExperiences = require('./seeds/experiences')
router.get('/fake/experiences/:amount', seedsExperiences.addFakeExperience);
>>>>>>> feat: route for cloudinary + config
router.get('/destroy-experiences', seedsExperiences.destroyAllExperiences)
router.get('/update-stripe', seedsExperiences.updateStripe)

const seedsUsers = require('./seeds/users')
<<<<<<< HEAD
router.get('/fake/users/:amount', seedsUsers.addFakeUser)
=======
router.get('/fake/users/:amount', seedsUsers.addFakeUser);
>>>>>>> feat: route for cloudinary + config
router.get('/destroy-users', seedsUsers.destroyAllUsers)

const seedsBookings = require('./seeds/bookings')
router.get('/fake/bookings/:amount', seedsBookings.addFakeBookings)
router.get('/destroy-bookings', seedsBookings.destroyAllBookings)

//auth routes
const userController = require('./controllers/user.controller')
<<<<<<< HEAD
router.post('/mockuser', userController.addMockUser)
router.post('/register', userController.addUser)
router.post('/login', userController.loginUser)
router.get('/logout', userController.logoutUser)
router.post('/profile', authMiddleware, userController.getUserProfile)
router.get('/users', userController.getUsers)

//experiences routes
const experienceController = require('./controllers/experience.controller')
router.post('/search-results', experienceController.searchResults)
router.get('/experiences', experienceController.allExperiences)
router.get('/experience/:id', experienceController.getOneExperiences)
router.post('/experiences/mine', authMiddleware, experienceController.mineExperiences)
router.post('/experiences/new', authMiddleware, experienceController.addExperience)
router.post('/experiences/addmany', authMiddleware, experienceController.addManyExperiences)
router.post('/experiences/delete', authMiddleware, experienceController.deleteExperience)

//bookings routes
const bookingController = require('./controllers/booking.controller')
router.get('/bookings', bookingController.allBookings)
router.post('/bookings/mine', authMiddleware, bookingController.mineBookings)
router.post('/bookings/new', authMiddleware, bookingController.createBooking)
router.post('/booking/:id', authMiddleware, bookingController.getOneBooking)
router.post('/bookings/success', authMiddleware, bookingController.bookingSuccess)
// router.post('/stripe/session', authMiddleware, stripeController.createSessionId)
=======
router.post('/register', userController.addUser);
router.post('/login', userController.loginUser);
router.get('/logout', userController.logoutUser);
router.post('/profile', authMiddleware, userController.getUserProfile);
router.get('/users', userController.getUsers);

//experiences routes
const experienceController = require('./controllers/experience.controller')
router.post('/search-results', experienceController.searchResults);
router.get('/experiences', experienceController.allExperiences);
router.get('/experience/:id', experienceController.getOneExperiences);
router.post('/experiences/mine', authMiddleware, experienceController.mineExperiences);
router.post('/experiences/new', authMiddleware, experienceController.addExperience);
router.post('/experiences/addmany', authMiddleware, experienceController.addManyExperiences);

//bookings routes
const bookingController = require('./controllers/booking.controller')
router.post('/bookings/mine', authMiddleware, bookingController.mineBookings);
router.post('/bookings/new', authMiddleware, bookingController.addBooking);
>>>>>>> feat: route for cloudinary + config

//stripe routes
const stripeController = require('./controllers/stripe.controller')
router.post('/stripe/connect-account', authMiddleware, stripeController.createConnectAccount)
<<<<<<< HEAD
router.post('/stripe/account-status', authMiddleware, stripeController.getAccountStatus)
router.post('/stripe/account-balance', authMiddleware, stripeController.getAccountBalance)
router.post('/stripe/payout-setting', authMiddleware, stripeController.getPayoutSetting)
router.post('/stripe/test', authMiddleware, stripeController.testAccountBalance)
=======
router.post('/stripe/account-status', authMiddleware, stripeController.getAccountStatus);
router.post('/stripe/account-balance', authMiddleware, stripeController.getAccountBalance);
router.post('/stripe/payout-setting', authMiddleware, stripeController.getPayoutSetting);
router.post('/stripe/test', authMiddleware, stripeController.testAccountBalance)
router.post('/stripe/session', authMiddleware, stripeController.createSessionId)
router.post('/stripe/success', authMiddleware, stripeController.stripeSuccess)

//cloudinary routes
router.post('/cloudinary-upload', fileUploader.single('file'), (req, res, next) => {
 
  if (!req.file) {
    next(new Error('No file uploaded!'))
    return
  }

  
  
  res.json({ secure_url: req.file.path })
})
>>>>>>> feat: route for cloudinary + config

module.exports = router;
