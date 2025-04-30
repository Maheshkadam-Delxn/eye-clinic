import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db/connection";
import Staff from "../../../../models/Staff";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();

    // Extract token from headers
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized: No token provided" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const doctorId = decoded.userId; // Extract doctorId from token

    // Parse request body
    const { role, username, password , phone} = await req.json();

    if (!role || !username || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new staff
    const newStaff = new Staff({
      role,
      username,
      password: hashedPassword,
      phone,
    });

    await newStaff.save();

    return NextResponse.json({ message: "Staff created successfully" }, { status: 201 });

  } catch (error) {
    console.error("Error creating staff:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
