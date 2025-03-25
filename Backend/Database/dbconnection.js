import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: "jobportal",
        });
        console.log("MongoDB connected successfully!");
    } catch (error) {
        console.error(`Error in DB connection: ${error.message}`);
        process.exit(1); // Exit the process in case of failure
    }
};
