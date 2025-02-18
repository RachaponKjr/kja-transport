import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";
import { MongoClient } from "mongodb";

const generateUniqueFileName = (originalFileName: string) => {
  const extension = path.extname(originalFileName);
  const timestamp = Date.now();
  return `${timestamp}${extension}`;
};

const client = new MongoClient(
  "mongodb+srv://rachapon:KG3NhAy2gixXTd0s@cluster0.bh3cl.mongodb.net/"
);

export async function POST(request: NextRequest) {
  try {
    await client.connect();
    const database = client.db("KJADATABASE");
    const collection = database.collection("performance");
    if (!request.headers.get("content-type")?.startsWith("multipart/form-data")) {
      return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
    }

    const formData = await request.formData();

    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const newFileName = generateUniqueFileName(file.name);

    const uploadDir = path.join(process.cwd(), "public/uploads");
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, newFileName);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);
    const timestamp = Date.now();

    await collection.insertOne({ imageUrl: `/uploads/${newFileName}`, timestamp });
    return NextResponse.json({
      message: "Upload successful",
      imageUrl: `/uploads/${newFileName}`,
      timestamp,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await client.connect();
    const database = client.db("KJADATABASE");
    const collection = database.collection("performance");
    const performance = await collection.find({}).sort({ _id: -1 }).limit(4).toArray();
    return NextResponse.json(performance);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await client.connect();
    const database = client.db("KJADATABASE");
    const collection = database.collection("performance");
    const { id } = await request.json();
    await collection.deleteOne({ _id: id });
    return NextResponse.json({ message: "Delete successful" });
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
  }
}
