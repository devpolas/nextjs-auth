import mongoose from "mongoose";
export async function mongoConnection() {
  try {
    const db = process.env.MONGO_URI!.replace(
      "<PASSWORD>",
      process.env.MONGO_PASSWORD || ""
    );
    if (db) {
      await mongoose.connect(db);
      const connection = await mongoose.connection;

      connection.on("connected", () => {
        console.log("MongoDB connected successfully.");
      });
      connection.on("error", (err) => {
        console.log("MongoDB connection error:", err);
      });
    } else {
      console.log("MongoDB connection string is not defined.");
    }
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
}
