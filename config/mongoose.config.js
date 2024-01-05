// Import mongoose module
import mongoose from "mongoose";
// Import Database url
import { DB_URL } from "./server.config.js";

// Mongoose connect function
export const connectToDB = async () => {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected using mongoose');
    } catch (error) {
        console.log(error);
    }
}