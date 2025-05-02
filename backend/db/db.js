import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URL, { dbName: "BookHive" })
        .then(() => {
            console.log(`DB Connected successfully: ${mongoose.connection.host}`);

        }).catch((err) => {
            console.log("Error connection DB ", err);
        })
}