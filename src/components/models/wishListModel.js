const {DataTypes} = require('sequelize');
const db = require('../../../db');

const WishList = db.define("wishList", {
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

module.exports = WishList;