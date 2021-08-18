const router = require('express').Router();
// const authMiddleware = require('./middlewares/auth.mw');

console.log(`\n..............................💫 ROUTES
post            /register
post            /login
get             /logout
get             /experiences
post            /experiences/new
get             /fake/experiences ==> creates and stores new fake data in DB
get             /xps  ==> returns fake data without hitting the DB
get             /search-result?location=Barcelona
..............................\n`);
//faker
const seedsExperiences = require('./seeds/experiences')
router.get('/fake/experiences/:amount', seedsExperiences.addFakeExperience);
const seedsUsers = require('./seeds/users')
router.get('/fake/users/:amount', seedsUsers.addFakeUser);
router.get('/destroy-experiences', seedsExperiences.destroyAllExperiences)
router.get('/destroy-users', seedsExperiences.destroyAllUsers)

//auth routes
const userController = require('./controllers/user.controller')
router.post('/register', userController.addUser);
router.post('/login', userController.loginUser);
router.get('/users', userController.getUsers);
router.get('/logout', userController.logoutUser);
router.post('/profile', userController.getUserProfile);

//experiences routes
const experienceController = require('./controllers/experience.controller')
router.post('/search-results', experienceController.searchResults);
router.get('/experiences', experienceController.allExperiences);
router.post('/experiences/mine', experienceController.mineExperiences);
router.post('/experiences/new', experienceController.addExperience);
router.post('/experiences/addmany', experienceController.addManyExperiences);

module.exports = router;
