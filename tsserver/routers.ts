const router = require('express').Router();
// import router from 'express'

console.log('routes:                       💫 importing routes');
//auth routes
const userController = require('./controllers/user.controller')
router.post('/register', userController.addUser);
router.post('/login', userController.loginUser);

// module.exports = router;
export default router;