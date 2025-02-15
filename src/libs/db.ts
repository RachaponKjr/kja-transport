import { MongoClient } from "mongodb";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}
const client = new MongoClient(process.env.DATABASE_URL);

let clientPromise;

if (process.env.NODE_ENV === "development") {
  clientPromise = client.connect();
} else {
  clientPromise = client.connect();
}

export default clientPromise;
