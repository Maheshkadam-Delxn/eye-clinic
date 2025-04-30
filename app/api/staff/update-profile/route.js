import { NextResponse } from "next/server";
import connectDB from "../../../lib/db/connection";
import Staff from "../../../models/Staff";
import jwt from "jsonwebtoken";

export async function PATCH(req) {
  try {
    await connectDB();

    // Extract token from headers
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized: No token provided" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const staffId = decoded.userId; // Extract staff ID from token

    // Parse request body
    const { fullName, phone, email, age, gender } = await req.json();

    // Update staff profile
    const updatedStaff = await Staff.findByIdAndUpdate(
      staffId,
      { fullName, phone, email, age, gender },
      { new: true }
    );

    if (!updatedStaff) {
      return NextResponse.json({ message: "Staff not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Profile updated successfully", updatedStaff }, { status: 200 });

  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
