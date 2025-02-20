// handler.js
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectDB, closeDB } from "@/libs/mongodb";

export async function POST(request: NextRequest) {
  let client;
  try {
    // เชื่อมต่อ MongoDB
    client = await connectDB();
    const database = client.db("KJADATABASE");
    const collection = database.collection("users");

    const { username, password } = await request.json();

    const user = await collection.findOne({ username });
    if (user) {
      return NextResponse.json({ error: "Username already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await collection.insertOne({ username, password: hashedPassword });

    return NextResponse.json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json({ error: "Failed to register user" }, { status: 500 });
  } finally {
    if (client) {
      await closeDB();
    }
  }
}
