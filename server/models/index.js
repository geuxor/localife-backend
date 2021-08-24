'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');
const db = {};
require('dotenv').config()

console.log('dbconx:                       🌠 connecting to database')

<<<<<<< HEAD
console.log('YOU ARE NOW RUNNING =======> ', process.env.NODE_ENV)

let sequelize;
if (process.env.NODE_ENV === 'production') {
  //configuration for heroku
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    port: 5432,
    host: 'https://git.heroku.com/localife.git',
    logging: false,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  })
}

//configuration for localhost
if (process.env.NODE_ENV === 'development') {
  sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
    host: process.env.PGHOST,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    // operatorsAliases: false // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  });
}


=======
const sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
  host: process.env.PGHOST,
  dialect: 'postgres',
    logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  // operatorsAliases: false // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
});
>>>>>>> feat: route for cloudinary + config
const files = fs.readdirSync(__dirname);

for (let file of files) {
  if (file !== 'index.js') {
<<<<<<< HEAD
    const modelCreation = require(path.join(__dirname, file))
=======
    const modelCreation = require(path.join(__dirname, file)) 
>>>>>>> feat: route for cloudinary + config
    const model = modelCreation(sequelize, DataTypes)
    db[model.name] = model;
  }
}

for (const model in db) {
  if (db[model].associate) db[model].associate(db);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
