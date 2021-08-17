// const bcrypt = require('bcrypt');
const db = require('../models/index')

function logme() {
  console.log('controller:                   🎮 entering user.controller *************');
}

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
    const resUser = await db.User.create(user);
    console.log('addUser: newUser Created:', resUser.toJSON())
    req.session.uid = resUser.id;
    res.status(201).send(resUser);
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
    
    if (!user) {
      console.log(user, 'not found in DB!!!');
      res.status(403).send('🐛 User not Found!');
    }
    console.log(user.dataValues, 'email found in DB!!!') 
    res.status(200).send({ email: user.email, firstname: user.firstname, lastname: user.lastname, createdAt: user.createdAt});
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .send({ error: '401', message: '🐛 Username or password is incorrect' });
  }
};


const logoutUser = (req, res) => {
  console.log('logoutUser:');
  res.sendStatus(200)
};

module.exports = { addUser, loginUser, logoutUser };
