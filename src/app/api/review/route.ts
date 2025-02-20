import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import { connectDB, closeDB } from "@/libs/mongodb";
import { ObjectId } from "mongodb";

const generateUniqueFileName = (originalFileName: string) => {
  const extension = path.extname(originalFileName);
  const timestamp = Date.now();
  return `${timestamp}${extension}`;
};

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

    const newFileName = generateUniqueFileName(file.name);

    const uploadDir = path.join(process.cwd(), "public/reviews-images");

    const filePath = path.join(uploadDir, newFileName);
    const timestamp = Date.now();
    await writeFile(filePath, buffer);

    await collection.insertOne({
      name,
      reviewText,
      reviewLink,
      imageUrl: `/reviews-images/${newFileName}`,
      timestamp,
    });

    return NextResponse.json({
      message: "Upload successful",
      name,
      reviewText,
      reviewLink,
      imageUrl: `/reviews-images/${newFileName}`,
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
