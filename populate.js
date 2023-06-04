// Built in method which is used to read the file
import dotenv from "dotenv";
import { readFile } from "fs/promises";
import connectDB from "./db/connect.js";
import Job from "./models/Job.js";
dotenv.config();

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    // Remove previous entries
    await Job.deleteMany();
    const jsonProducts = JSON.parse(
      await readFile(new URL("./mock-data.json", import.meta.url))
    );
    await Job.create(jsonProducts);
    console.log("Database was populated successfully");
    // The process.exit() method instructs Node.js to terminate the process synchronously
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
