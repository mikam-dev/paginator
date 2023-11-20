import mongoose from "mongoose";

let cached_connection: typeof mongoose;

export default async function dbConnect() {
  const CONNECTION_STRING = `${process.env.MONGODB_URI}${process.env.PARTICIPANT}`;

  if (!CONNECTION_STRING) {
  throw new Error('Mongo DB Connection String is not defined');
  }
  if (cached_connection) {
    return cached_connection;
  } else {
    cached_connection = await mongoose.connect(CONNECTION_STRING ?? '')
    return cached_connection;
  }
}