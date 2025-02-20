import { NextRequest, NextResponse } from "next/server";
import { connectDB, closeDB } from "@/libs/mongodb";
import { ObjectId } from "mongodb";

export async function POST(request: NextRequest) {
  let client;
  try {
    client = await connectDB();
    const database = client.db("KJADATABASE");
    const collection = database.collection("reviews");

    const formData = await request.formData();
    const name = formData.get("name") as string;
    const reviewText = formData.get("reviewText") as string;
    const reviewLink = formData.get("reviewLink") as string;
    const file = formData.get("file") as File | null;

    if (!name || !reviewText) {
      return NextResponse.json({ error: "กรุณาใส่ ชื่อ หรือ ข้อความให้ครบด้วย" }, { status: 400 });
    }

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
      name,
      reviewText,
      reviewLink,
      imageBase64: base64String, // ใช้ imageBase64 แทน imageUrl
      timestamp,
    });

    return NextResponse.json({
      message: "Upload successful",
      name,
      reviewText,
      reviewLink,
      imageBase64: base64String,
      timestamp,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  } finally {
    if (client) {
      await closeDB();
    }
  }
}

export async function GET() {
  let client;
  try {
    client = await connectDB();
    const database = client.db("KJADATABASE");
    const collection = database.collection("reviews");

    const reviews = await collection.find({}).toArray();
    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  } finally {
    // if (client) {
    //   await closeDB();
    // }
  }
}

export async function DELETE(request: NextRequest) {
  let client;
  try {
    client = await connectDB();
    const database = client.db("KJADATABASE");
    const collection = database.collection("reviews");

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
