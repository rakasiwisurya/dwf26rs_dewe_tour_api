const Sequelize = require("sequelize");

const db = {};
const sequelize = new Sequelize("db_dewe_tour", "root", null, {
  host: "localhost",
  port: "4000",
  dialect: mysql,
  logging: console.log,
  freezeTableName: true,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

db.sequelize = sequelize;

module.exports = db;
