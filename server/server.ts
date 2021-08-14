import express from 'express';
require('dotenv').config()

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome!');
})

// Server setup
app.listen(process.env.PORT, () => {
  console.log('The application is listening '
    + 'on port http://localhost:' + process.env.PORT);
})