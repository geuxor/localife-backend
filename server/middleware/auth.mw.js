const db = require('../models/index')

const authMiddleware = async (req, res, next) => {
  console.log('authMW:.......................🚽 entering authMiddelWare')
  
  if (!req.session) {
    return next(new Error('Redis was Unable to store Session'))
  }
  console.log('with session:', req.sessionID, 'and body', req.body);
  if (req.session.isAuth) {
    console.log('Logged in');
  } else {
    console.log('Not Logged in');
  }

  try {
    const { isAuth } = req.session;
    console.log('MW: isAuth ', isAuth);
    if (!isAuth) throw new Error('not Authenticated');
    const user = await db.User.findOne({ where: { id: isAuth }});    //and where { email: req.body }?
<<<<<<< HEAD
    console.log('MW: User.id', user.id)
=======
    console.log('User.id', user.id)
>>>>>>> feat: route for cloudinary + config
    if (!user) throw new Error();
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send(err)
  }
};

module.exports = authMiddleware;
