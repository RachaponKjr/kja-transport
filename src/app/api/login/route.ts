// handler.js
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectDB, closeDB } from "@/libs/mongodb"; // นำเข้า connectDB และ closeDB
import "dotenv/config";

export async function POST(request: NextRequest) {
  let client;
  try {
    // เชื่อมต่อ MongoDB
    client = await connectDB();
    const database = client.db("KJADATABASE");
    const collection = database.collection("users");

    const { username, password } = await request.json();
    const user = await collection.findOne({ username });

    if (!user) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    // ตรวจสอบรหัสผ่าน
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    // ตรวจสอบว่า SECRET_KEY มีหรือไม่
    if (!process.env.SECRET_KEY) {
      throw new Error("SECRET_KEY is not defined");
    }

    // สร้าง JWT
    const token = jwt.sign({ username: user.username }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return NextResponse.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json({ error: "Failed to log in" }, { status: 500 });
  } finally {
    // ปิดการเชื่อมต่อ MongoDB
    if (client) {
      await closeDB();
    }
  }
}
