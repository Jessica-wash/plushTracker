const {DataTypes} = require('sequelize');
const db = require('../../../db');

const Plush = db.define ("ownedPlush", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bio: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    link: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = Plush;