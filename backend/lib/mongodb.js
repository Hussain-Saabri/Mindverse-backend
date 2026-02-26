import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
    } catch (error) {
        // Handle error silently or with dedicated monitoring in production
    }
}