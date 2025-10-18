import mongoose from "mongoose";

export default async function dbConnection() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Database connect successfully!");
    });

    connection.on("error", () => {
      console.log("Fail to connect Database!");
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log(String(error));
    }
  }
}
