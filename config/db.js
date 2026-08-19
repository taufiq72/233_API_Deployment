const db = require("../models");

const connectDatabase = async () => {
  await db.sequelize.authenticate();
  console.log("Database connected successfully.");
};

module.exports = connectDatabase;