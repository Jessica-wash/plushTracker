require('dotenv').config()
const Sequelize = require('Sequelize');
const {userController} = require('./src/components/controllers');
const {plushController } = require('./src/components/controllers');
const {wishListController} = require('./src/components/controllers')

// const sequelize = new Sequelize(process.env.DATABASE_URL_LOCAL)

const db = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    ssl: process.env.ENVIRONMENT ==='production'
})

userController.hasMany(plushController);
plushController.belongsTo(userController);

userController.hasOne(wishListController);
wishListController.belongsTo(userController);


module.exports = db;