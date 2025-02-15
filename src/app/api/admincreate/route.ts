import clientPromise from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { username, password, email } = await request.json();
  try {
    const client = await clientPromise;
    const db = client.db("KJADATABASE");
    const createAdmin = await db.collection("admin-user").insertOne({
      username: username,
      password: password,
      email: email,
    });
    return NextResponse.json(createAdmin, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
