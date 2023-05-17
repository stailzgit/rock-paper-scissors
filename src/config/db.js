import pkg from "mongoose";
const { set, connect, connection } = pkg;
import "dotenv/config";

const connectDB = () => {
  set("strictQuery", false);
  return connect(
    process.env.DATABASE_URL,
    { useUnifiedTopology: true, useNewUrlParser: true },
    (err) => {
      err
        ? console.error("Connection to DB failed", err)
        : console.log("Connection to DB OK");
    }
  );
};

const db = connection;

db.on("error", console.error.bind(console, "MongoDB connection failed"));

export default connectDB;
