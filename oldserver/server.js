const express = require('express');
const app = express();
const session = require('express-session');
const router = require('./routers')
const cors = require('cors');
const SERVER_PORT = process.env.SERVER_PORT || 4001;
const { sequelize } = require('./models/index')
const faker = require('faker');

require('dotenv').config()

const corsConfig = {
  origin: process.env.CLIENT_ORIGIN,
  credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json());

app.use(
  session({
    name: 'sid%life',
    saveUninitialized: false,
    resave: false,
    secret: process.env.SECRET || '*&^%$£$%TYUJIKL?<HDTYUKO<MKNBFE£$R%T^Y&UJNBFW',
    cookie: {
      maxAge: 2000 * 60 * 60, // 1hr
      sameSite: true,
      httpOnly: false,
      // set secure and httponly =true in prod
      secure: false,
    },
  })
  );  
  
  app.use(router);

  app.get("/xps", (req, res) => {
    res.json(getXps());
  });
  
  function getXps() {
    let experiences = [];

    for (let i = 0; i < 12; i++) {
      const randomTitle = faker.commerce.productAdjective()
      const randomWords = faker.lorem.words()
      var randomCity = faker.address.cityName();
      var randomImage = faker.image.imageUrl();
      const randomDescription = faker.commerce.productDescription()
      const randomPrice = faker.commerce.price()
      experiences.push({
        title: randomTitle + ' ' + randomWords,
        description: randomDescription,
        location: randomCity,
        price: randomPrice,
        image: randomImage
      })
    }
    return experiences;
  }

app.get('*', (req, res) => {
  res.status(404).send('server ERR:                   🌵 No Route found');
});  

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('server:                       💽 database synced')
    app.listen(process.env.SERVER_PORT, (err) => {
      if (err) {
        console.log(`server ERR:          👽 Bad errors occuring! ${err}`); // eslint-disable-line no-console
      } else {
        console.log(`===========================   🛰️ Server listening on port ${process.env.SERVER_PORT}! =======================>>`); // eslint-disable-line no-console
      }  
    })  
  } catch (err) {
    console.log(err)
  }  
})();  


