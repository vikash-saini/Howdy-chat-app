const mongoose = require("mongoose");
// var dotenv = require('dotenv');
// dotenv.config();

const connectDb = async () => {
//   console.log(process.env.DB_CONNECTION_URL);

  await mongoose
    .connect(process.env.DB_CONNECTION_URL)
    .then(() => {
      console.log("Connected to Mongo DB");
    })
    .catch((error) => {
      console.log("Error in db connection: ", error);
      process.exit();
    });
};

module.exports = connectDb;
