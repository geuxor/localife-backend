const express = require('express')
const app = express()
const session = require('express-session')
const router = require('./routers')
const cors = require('cors')
const { sequelize } = require('./models/index')
const fakeXps = require('./seeds/fakeXps')
require('dotenv').config()

if (!process.env.REDISTOGO_URL) console.log('REDISTOGO_URL =====> development');

let redisClient
if (process.env.REDISTOGO_URL) {
  redisClient = 'redis://redistogo:43da5972d6b2eab02775e2575419adad@soapfish.redistogo.com:11156/'
  const rtg = require('url').parse(process.env.REDISTOGO_URL);
  redisClient = require('redis').createClient(rtg.port, rtg.hostname);
  redisClient.auth(rtg.auth.split(':')[1]);
} else {
  redisClient = require('redis').createClient()
}
let RedisStore = require('connect-redis')(session)

const origin = process.env.NODE_ENV === 'development' ? 'http://localhost' : 'https://localife.netlify.app'
const corsConfig = {
  origin: origin,
  credentials: true,
};
console.log('origin =====>', origin);

app.use(cors(corsConfig));
app.use(express.json());

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    name: 'sid%localife',
    saveUninitialized: false,
    resave: false,
    secret: process.env.SECRET || '*&^%$£$%TYUJIKL?<HDTYUKO<MKNBFE£$R%T^Y&UJNBFW',
    cookie: {
      maxAge: 4000000000,
      sameSite: true,
      httpOnly: true,
      // set secure and httponly =true in prod
      secure: true,
    },
  })
);
redisClient.on('server: error', console.error)

app.use(router);

app.get('/xps/:amount', (req, res) => {
  res.json(fakeXps(req.params));
});

app.get('*', (req, res) => {
  res.status(404).send('server ERR:                   🌵 No Route found');
});

(async () => {
  const host = process.env.HOST
  const port = process.env.PORT || 4001
  try {
    await sequelize.sync({ alter: true });
    console.log('server:                       💽 database synced')
    app.listen(port, host, (err) => {
      if (err) {
        console.log(`server ERR:           👽 Bad errors occuring! ${err}`);
      } else {
        console.log(`===========================   🛰️ Server listening on port ${port} - ${host}! =======================>>`); // eslint-disable-line no-console
      }
    })
  } catch (err) {
    console.log(err)
  }
})();
