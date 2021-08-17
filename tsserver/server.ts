require('dotenv').config()
// const express = require('express');
import express, { Request, Response, Application } from 'express';
// const cors = require('cors');
import cors from 'cors'
// const helmet = require ("helmet")
import helmet from 'helmet'
const app:Application = express();
// const session = require('express-session');
import session from 'express-session'
// const router = require('./routers.ts')
import router from './routers'
const redis = require('redis')
let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient()
const SERVER_PORT = process.env.SERVER_PORT || 4001;
import db from './models';
// const { sequelize } = require('./models/index.ts')
// const db = require('./models/index.ts');
// DNS Prefetch Control, Frameguard, Hide Powered-By, HSTS, IE No Open, Don't Sniff Mimetype, and XSS Filter.
app.use(helmet());

const corsConfig = {
  origin: process.env.CLIENT_ORIGIN,
  credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json());

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    name: 'sid%colon',
    saveUninitialized: false,
    resave: false,
    secret: process.env.SECRET || '*&^%$£$%TYUJIKL?<HDTYUKO<MKNBFE£$R%T^Y&UJNBFW',
    cookie: {
      maxAge: 1000 * 60 * 60, // 1hr
      sameSite: true,
      httpOnly: false,
      // set secure and httponly =true in prod
      secure: false,
    },
  })
);
redisClient.on('server: error', console.error)

app.use(router);
app.get('/', (req:Request, res:Response):void => {
  res.send('Welcome!');
})
app.get('*', (req: Request, res: Response): void => {
  res.status(404).send('server ERR:                   🌵 No Route found');
});

(async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log('server:                       💽 database synced')
    app.listen(process.env.SERVER_PORT, (e):void => {
      if (e) {
        console.log(`server ERR:          👽 Bad errors occuring! ${e}`); // eslint-disable-line no-console
      } else {
        console.log(`===========================   🛰️ Server listening on port ${process.env.SERVER_PORT}! =======================>>`); // eslint-disable-line no-console
      }
    })
  } catch (err) {
    console.log(err)
  }
})();
