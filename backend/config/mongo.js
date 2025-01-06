import mongoose from "mongoose";

export async function connectDB() {
  try {
    console.log("mongo uri=", process.env.MONGO_URI);
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connection to MongoDB: ${error.message}`);
    process.exit(1); // 1 is failure and 0 status code is success
  }
}
