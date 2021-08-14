'use strict';
var _a = require('sequelize'), Sequelize = _a.Sequelize, DataTypes = _a.DataTypes;
var fs = require('fs');
var path = require('path');
var db = {};
require('dotenv').config();
console.log('dbconx:                       🧹 connecting to database');
var sequelize = new Sequelize(process.env.DBPG_DATABASE, process.env.DBPG_USER, process.env.DBPG_PASSWORD, {
    host: process.env.DBPG_HOST,
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
var files = fs.readdirSync(__dirname);
for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
    var file = files_1[_i];
    if (file !== 'index.js') {
        var modelCreation = require(path.join(__dirname, file));
        var model = modelCreation(sequelize, DataTypes);
        db[model.name] = model;
    }
}
for (var model in db) {
    if (db[model].associate)
        db[model].associate(db);
}
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
