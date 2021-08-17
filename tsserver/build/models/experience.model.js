"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Optional } = require('sequelize');
console.log('model:                       🙋 entering experience.model');
class Experience extends ExperienceModel {
}
function ExperienceModel(seq, types) {
    const Experience = seq.define('Experience', {
        title: {
            type: types.STRING,
            allowNull: false,
        },
        description: {
            type: types.STRING,
            allowNull: false
        },
        location: {
            type: types.STRING,
            allowNull: false
        },
        price: {
            type: types.INTEGER,
            allowNull: false
        },
        image: {
            type: types.STRING,
        },
        from: {
            type: types.DATE
        },
        to: {
            type: types.DATE
        },
        quantity: {
            type: types.INTEGER
        },
        type: {
            type: types.ENUM('type1', 'type2')
        },
        timestamps: types.DATE
    }, {});
    Experience.associate = function (models) {
        Experience.belongsTo(models.User);
    };
    return Experience;
}
;
module.exports = ExperienceModel;
