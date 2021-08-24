const router = require('express').Router()
const authMiddleware = require('./middleware/auth.mw')

console.log(`\n💫 ROUTES..............................
>>SEEDS
get             /seed           => populate data to DB

>>AUTH..........
post            /register
post            /login          => cookie is created
get             /logout         => cookie is destroyed
post            /profile        => relogin user

>>EXPERIENCES....
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
router.get('/destroy-experiences', seedsExperiences.destroyAllExperiences)
router.get('/update-stripe', seedsExperiences.updateStripe)

const seedsUsers = require('./seeds/users')
router.get('/fake/users/:amount', seedsUsers.addFakeUser)
router.get('/destroy-users', seedsUsers.destroyAllUsers)

const seedsBookings = require('./seeds/bookings')
router.get('/fake/bookings/:amount', seedsBookings.addFakeBookings)
router.get('/destroy-bookings', seedsBookings.destroyAllBookings)

//auth routes
const userController = require('./controllers/user.controller')
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

//stripe routes
const stripeController = require('./controllers/stripe.controller')
router.post('/stripe/connect-account', authMiddleware, stripeController.createConnectAccount)
router.post('/stripe/account-status', authMiddleware, stripeController.getAccountStatus)
router.post('/stripe/account-balance', authMiddleware, stripeController.getAccountBalance)
router.post('/stripe/payout-setting', authMiddleware, stripeController.getPayoutSetting)
router.post('/stripe/test', authMiddleware, stripeController.testAccountBalance)
router.post('/stripe/session', authMiddleware, stripeController.createSessionId)
router.post('/stripe/success', authMiddleware, stripeController.stripeSuccess)

//cloudinary routes
router.post('/cloudinary-upload', fileUploader.single('file'), (req, res, next) => {
 
  if (!req.file) {
    next(new Error('No file has been uploaded!'))
    return
  }  
  
  res.json({ secure_url: req.file.path })
})

module.exports = router;
