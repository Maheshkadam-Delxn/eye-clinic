import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db/connection";
import Staff from "../../../../models/Staff";
import jwt from "jsonwebtoken";

export async function DELETE(req) {
  try {
    await connectDB();

    // Extract token from headers
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized: No token provided" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const doctorId = decoded.userId; // Extract doctor ID from token

    // Parse request body
    const { staffId } = await req.json();

    if (!staffId) {
      return NextResponse.json({ message: "Staff ID is required" }, { status: 400 });
    }

    // Find and delete the staff member
    const deletedStaff = await Staff.findByIdAndDelete(staffId);

    if (!deletedStaff) {
      return NextResponse.json({ message: "Staff not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Staff deleted successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error deleting staff:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
