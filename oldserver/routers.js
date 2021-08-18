const router = require('express').Router();

console.log(`💫 routes:
post            /register
post            /login
get             /logout
get             /experiences
post            /experiences/new
get             /fake/experiences ==> creates and stores new fake data in DB
get             /xps  ==> returns fake data without hitting the DB
get             /search-results?location=Barcelona (without quotes)
`);

const seedsExperiences = require('./seeds/experiences')
router.get('/fake/experiences', seedsExperiences.addFakeExperience);

//auth routes
const userController = require('./controllers/user.controller')
router.post('/register', userController.addUser);
router.post('/login', userController.loginUser);
router.get('/logout', userController.logoutUser);

//product routes
const ExperienceController = require('./controllers/experience.controller')
router.get("/experiences", ExperienceController.allExperiences);
router.post("/search-results", ExperienceController.searchResults);
router.post("/experiences/new", ExperienceController.addExperience);

module.exports = router;
