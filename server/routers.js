const router = require('express').Router();
const authMiddleware = require('./middleware/auth.mw');

console.log(`\n💫 ROUTES..............................
get             /search-result?location=Barcelona

post            /register
post            /login => cookie is created
get             /logout => cookie is destroyed
post            /profile       ==> relogin user

EXPERIENCES.....
get             /fake/experiences/"amount" => creates and stores new fake data in DB with specific amount
post            /experiences/new      => create a new experience
get             /experiences          => get all experiences
get             /destroy-experiences  ==> empties the Experience table in DB
get             /xps  ==> returns fake data without hitting the DB

USERS..........
get             /fake/users/"amount" ==> creates and stores new fake data in DB with specific amount
get             /destroy-users ==> empties the User table in DB
get             /users         ==> get all users

BOOKINGS.......
get             /fake/bookings/:amount'
get             /destroy-bookings

get             /update-stripe
..............................\n`);
//faker
const seedsExperiences = require('./seeds/experiences')
router.get('/fake/experiences/:amount', seedsExperiences.addFakeExperience);
router.get('/destroy-experiences', seedsExperiences.destroyAllExperiences)
router.get('/update-stripe', seedsExperiences.updateStripe)
const seedsUsers = require('./seeds/users')
router.get('/fake/users/:amount', seedsUsers.addFakeUser);
router.get('/destroy-users', seedsUsers.destroyAllUsers)
const seedsBookings = require('./seeds/bookings')
router.get('/fake/bookings/:amount', seedsBookings.addFakeBookings)
router.get('/destroy-bookings', seedsBookings.destroyAllBookings)


//auth routes
const userController = require('./controllers/user.controller')
router.post('/register', userController.addUser);
router.post('/login', userController.loginUser);
router.get('/users', userController.getUsers);
router.get('/logout', userController.logoutUser);
router.post('/profile', authMiddleware, userController.getUserProfile);

//experiences routes
const experienceController = require('./controllers/experience.controller')
router.post('/search-results', experienceController.searchResults);
router.get('/experience/:id', experienceController.getOneExperiences);
router.get('/experiences', experienceController.allExperiences);
router.post('/experiences/mine', experienceController.mineExperiences);
router.post('/experiences/new', experienceController.addExperience);
router.post('/experiences/addmany', experienceController.addManyExperiences);

//bookings routes
const bookingController = require('./controllers/booking.controller')
router.post('/bookings/mine', authMiddleware, bookingController.mineBookings);
router.post('/bookings/new', authMiddleware, bookingController.addBooking);

//stripe routes
const stripeController = require('./controllers/stripe.controller')
router.post('/stripe/connect-account', authMiddleware, stripeController.createConnectAccount)
router.post('/stripe/account-status', authMiddleware, stripeController.getAccountStatus);
router.post('/stripe/account-balance', authMiddleware, stripeController.getAccountBalance);
router.post('/stripe/payout-setting', authMiddleware, stripeController.getPayoutSetting);
router.post('/stripe/test', authMiddleware, stripeController.testAccountBalance)
router.post('/stripe/session', authMiddleware, stripeController.createSessionId)
router.post('/stripe/success', authMiddleware, stripeController.stripeSuccess)

module.exports = router;
