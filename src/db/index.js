import mongoose from "mongoose";
import { DB_NAME } from '../constant.js';

export const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`MongoDB connection established!! \nThe HOST is ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection failed: ", error)
    }
}