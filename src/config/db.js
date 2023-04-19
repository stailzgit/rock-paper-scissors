const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = () => {
  mongoose.set("strictQuery", false);
  return mongoose.connect(
    process.env.DATABASE_URL,
    { useUnifiedTopology: true, useNewUrlParser: true },
    (err) => {
      err
        ? console.error("Connection to DB failed")
        : console.log("Connection to DB OK");
    }
  );
};

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection failed"));

module.exports = connectDB;
