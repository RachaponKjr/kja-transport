// db.js
import { MongoClient } from "mongodb";
import "dotenv/config";

const client = new MongoClient(
  "mongodb+srv://rachapon:B7gRxXQhCe9wkMQo@cluster0.bh3cl.mongodb.net/"
);

let isConnected = false;

export const connectDB = async () => {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
    console.log("MongoDB connected");
  }
  return client;
};

export const closeDB = async () => {
  if (isConnected) {
    await client.close();
    isConnected = false;
    console.log("MongoDB connection closed");
  }
};
