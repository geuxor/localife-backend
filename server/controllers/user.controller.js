// const bcrypt = require('bcrypt');
const db = require('../models/index')
const { validateNewUser, validateOldUser } = require('../utils/validate.user')

function logme() {
  console.log('controller:                   🎮 entering user.controller ************');
}


const getUsers = async (req, res) => {
  logme()
  console.log('getUsers');
  try {
    const users = await db.User.findAll();
    console.log('   #', users.length, 'users found');
    users.forEach(m => console.log(m.email))
    res.status(200).send(users);
  } catch (err) {
    console.log(err);
    res.status(404).send({ err, message: '🐛 Users not found' });
  }
}

const getUserProfile = async (req, res) => {
  logme()
  console.log('getuserProfile:');
  try {
    const user = req.user
    const { email, firstname, lastname, avatar, createdAt, stripe_registration_complete } = user
    if (!user) throw new Error('mw says invalid user')
    console.log('ReLogged in successfully as user.id:', req.session.isAuth);
    res.status(200).send({ email, firstname, lastname, avatar, createdAt, stripe_registration_complete });
  } catch (err) {
    console.log('getuserProfile:', err);
    res.status(404).send({ message: err.message })
  }
};

const addMockUser = async (req, res) => {
  logme()
  const userData = req.body;
  try {
    if (userData) {
      const validatedUserRes = await validateNewUser(userData)
      userData.password = validatedUserRes.password
      const newuser = await db.User.create(userData);
      console.log('addUser: newUser Created:', newuser)
      req.session.isAuth = newuser.id
      res.status(201).send('ok');
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};


const addUser = async (req, res) => {
  logme()
  const { email } = req.body;
  try {
    const user = await db.User.findOne({ where: { email: email } });
    if (user) {
      res.status(201).send('User already exists')
    } else {
      const validatedUserRes = await validateNewUser(req.body)
      // console.log('Validation response:', validatedUserRes.password);
      if (validatedUserRes.email === req.body.email) {
        const newuser = await db.User.create(validatedUserRes);
        console.log('addUser: newUser Created:', newuser)
        req.session.isAuth = newuser.id
        res.status(201).send('ok');
      } else {
        res.status(201).send(validatedUserRes);
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const loginUser = async (req, res) => {
  logme()
  console.log(req.session);
  console.log('loginUser', req.body);
  try {
    const { email, password } = req.body;
    if (!email && !password) throw new Error('🐛 password or email is empty')
    const user = await db.User.findOne({
      where: { email: email },
      returning: true,
      plain: true,
    });
    if (!user) {
      console.log(user, ': user not found in DB!!!');
      res.status(403).send('🐛 User not Found!');
    } else {
      const validatedPass = await validateOldUser(user, email, password)
      if (!validatedPass) throw new Error('🐛 username or password is incorrect');
      req.session.isAuth = user.id
      console.log('Logged in successfully as user.id:', req.session.isAuth, user.email);
      res.status(200).send({ email: user.email, firstname: user.firstname, lastname: user.lastname, avatar: user.avatar, createdAt: user.createdAt });
    }
  } catch (err) {
    console.log(err);
    res
      .status(401)
      .send({ error: '401', message: err });
  }
};

const logoutUser = (req, res) => {
  console.log('logoutUser');
  console.log('destroying...')
  try {
    req.session.destroy((error) => {
      if (error) {
        res
          .status(500)
          .send({ error, message: '🐛 Could not log out, please try again' });
      }
      res.clearCookie('sid').send({ cookie: 'destroyed' });
      console.log('sid destroyed!!');
    });
  } catch (err) {
    console.log(err);

  }
};

module.exports = { getUsers, addUser, loginUser, logoutUser, getUserProfile, addMockUser };
