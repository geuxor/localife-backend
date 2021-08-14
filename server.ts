import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
dotenv.config();
// require('dotenv').config()

const app = express();
// DNS Prefetch Control, Frameguard, Hide Powered-By, HSTS, IE No Open, Don't Sniff Mimetype, and XSS Filter.
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome!');
})

// Server setup
app.listen(process.env.SERVER_PORT, () => {
  console.log('⚡️ Server listening http://localhost:' + process.env.SERVER_PORT + ' ==================================>>');
})

// const PORT: number = parseInt(process.env.SERVER_PORT as string, 10);
// console.log(PORT)