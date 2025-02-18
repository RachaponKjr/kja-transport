import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
const client = new MongoClient(
  "mongodb+srv://rachapon:KG3NhAy2gixXTd0s@cluster0.bh3cl.mongodb.net/"
);

export async function POST(request: NextRequest) {
  try {
    await client.connect();
    const database = client.db("KJADATABASE");
    const collection = database.collection("users");
    const { username, password } = await request.json();
    const user = await collection.findOne({ username });

    if (!user) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    if (!process.env.SECRET_KEY) {
      throw new Error("SECRET_KEY is not defined");
    }
    const token = jwt.sign({ username: user.username }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return NextResponse.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json({ error: "Failed to log in" }, { status: 500 });
  }
}
