'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');
const db = {};
require('dotenv').config()

console.log('dbconx:                       🧹 connecting to database')
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
});
const files = fs.readdirSync(__dirname);

for (let file of files) {
  if (file !== 'index.js') {
    const modelCreation = require(path.join(__dirname, file)) 
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
