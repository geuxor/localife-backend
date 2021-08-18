// const bcrypt = require('bcrypt');
const db = require('../models/index')

function logme() {
  console.log('controller:                   🎮 entering user.controller ************');
}


const getUsers = async (req, res) => {
  logme()
  console.log('getUsers');
  try {
    const users = await db.User.findAll();
    console.log('   #', users.length, 'users found');
    // console.log("All users:", JSON.stringify(users, null, 2));
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
    const {email, firstname, lastname, createdAt} = user
    res.status(200).send({ email, firstname, lastname, createdAt });
  } catch {
    res.status(404).send({ error, message: '🐛 User not found' });
  }

};

const addUser = async (req, res) => {
  logme()
  console.log('addUser', req.body)
  const { email, password, firstname, lastname } = req.body;
  const user = await db.User.findOne({ where: { email: email } });

  if (user)
    return res
      .status(409)
      .send({ error: '409', message: '🐛 User already exists' });
  try {
    const user = await db.User.create(req.body);
    console.log('addUser: newUser Created:', user.toJSON())
    req.session.uid = user.id;
    res.status(201).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error, message: 'addUser: 🐛 Could not create user' });
  }
};

const loginUser = async (req, res) => {
  logme()
  console.log('loginUser', req.body);
  try {
    const { email, password } = req.body;
    if (!email && !password) throw new Error('🐛 password or email is empty')
    const user = await db.User.findOne({ 
      where: { email: email },
      returning: true,
      plain: true,
    });
    // console.log(user.toJSON());
    
    if (!user) {
      console.log(user, 'not found in DB!!!');
      res.status(403).send('🐛 User not Found!');
    }
    console.log('loginUser: ok!!', user.email);
    res.status(200).send({ email: user.email, firstname: user.firstname, lastname: user.lastname, createdAt: user.createdAt});
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
    console.log('waiting...')
  
  req.session.destroy((error) => {
    if (error) {
      res
        .status(500)
        .send({ error, message: '🐛 Could not log out, please try again' });
    } else {
      res.clearCookie('sid');
      console.log('sid destroyed!!');
      res.sendStatus(200) //.send('CLEARED');
    }
  });
  }, 1000);
};

module.exports = { getUsers, addUser, loginUser, logoutUser, getUserProfile };
