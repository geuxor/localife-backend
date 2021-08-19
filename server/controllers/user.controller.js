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
  console.log('getuserProfile');
  try {
    const user = req.user
    const { email, firstname, lastname, createdAt } = user
    res.status(200).send({ email, firstname, lastname, createdAt });
  } catch (error) {
    res.status(404).send({ error, message: '🐛 User not found' });
  }

};

const addUser = async (req, res) => {
  logme()
  console.log('addUser', req.body)
  const { email } = req.body;
  try {
    const user = await db.User.findOne({ where: { email: email } });
    if (user) {
      res.status(201).send('User already exists')
    } else {
      const validatedUserRes = await validateNewUser(req.body)
      console.log('Validation response:', validatedUserRes);
      if (validatedUserRes.email === req.body.email) {
        const newuser = await db.User.create(validatedUserRes);
        console.log('addUser: newUser Created:', newuser.toJSON())
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
      console.log(user, 'not found in DB!!!');
      res.status(403).send('🐛 User not Found!');
    }
    const validatedPass = await validateOldUser(user, email, password)
    if (!validatedPass) throw new Error('🐛 username or password is incorrect');
    req.session.isAuth = user.id
    console.log('Logged in successfully as user.id:', req.session.isAuth, user.email);
    res.status(200).send({ email: user.email, firstname: user.firstname, lastname: user.lastname, avatar: user.avatar, createdAt: user.createdAt });
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .send({ error: '401', message: '🐛 Username or password is incorrect' });
  }
};

const logoutUser = (req, res) => {
  console.log('logoutUser');
  setTimeout(() => {
    console.log('destroying...')

    req.session.destroy((error) => {
      if (error) {
        res
          .status(500)
          .send({ error, message: '🐛 Could not log out, please try again' });
      } else {
        res.sendStatus(200)
      }
      res.clearCookie('sid');
      console.log('sid destroyed!!');
    });
  }, 1000);
};

module.exports = { getUsers, addUser, loginUser, logoutUser, getUserProfile };
