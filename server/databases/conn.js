import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.set("strictQuery", true);

const MONGO_URI =
    process.env.MONGO_URI;

const connectDB = async () => {
    const db = await mongoose.connect(MONGO_URI)
    return db;
};

export default connectDB;
