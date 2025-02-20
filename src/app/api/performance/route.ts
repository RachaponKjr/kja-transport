// handler.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB, closeDB } from "@/libs/mongodb"; // ใช้ connectDB และ closeDB
import { ObjectId } from "mongodb";

export async function POST(request: NextRequest) {
  let client;
  try {
    // เชื่อมต่อ MongoDB
    client = await connectDB();
    const database = client.db("KJADATABASE");
    const collection = database.collection("performance");

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // แปลง Buffer เป็น Base64
    const base64String = `data:${file.type};base64,${buffer.toString("base64")}`;

    const timestamp = Date.now();

    // บันทึก Base64 ลง MongoDB
    await collection.insertOne({
      imageBase64: base64String,
      timestamp,
    });

    return NextResponse.json({
      message: "Upload successful",
      imageBase64: base64String,
      timestamp,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function GET() {
  let client;
  try {
    // เชื่อมต่อ MongoDB
    client = await connectDB();
    const database = client.db("KJADATABASE");
    const collection = database.collection("performance");

    const performance = await collection.find({}).sort({ _id: -1 }).limit(4).toArray();
    return NextResponse.json(performance);
  } catch (error) {
    console.error("Error fetching performance:", error);
    return NextResponse.json({ error: "Failed to fetch performance" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  let client;
  try {
    client = await connectDB();
    const database = client.db("KJADATABASE");
    const collection = database.collection("performance");

    const { id } = await request.json();

    // ตรวจสอบว่า id ถูกต้องและแปลงเป็น ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    // ลบข้อมูลโดยใช้ ObjectId
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "No matching review found to delete" }, { status: 404 });
    }

    return NextResponse.json({ message: "Delete successful" });
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
  } finally {
    if (client) {
      await closeDB();
    }
  }
}
