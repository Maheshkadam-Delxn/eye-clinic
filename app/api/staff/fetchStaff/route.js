import { NextResponse } from "next/server";
import connectDB from "../../../lib/db/connection";
import Staff from "../../../models/Staff"; // Assuming the model for staff is in this path

export async function GET(req) {
  try {
    await connectDB(); // Connect to MongoDB

    // Extract query parameter for role
    const searchParams = req.nextUrl.searchParams;
    const role = searchParams.get("role"); // Expected query parameter: ?role=doctor, receptionist, etc.

    // Validate query parameter
    if (!role) {
      return NextResponse.json({ message: "Missing role parameter" }, { status: 400 });
    }

    // Fetch staff members based on role
    const staffMembers = await Staff.find({ role }).select("username role email phone isAdmin");

    // Check if staff members exist for the given role
    if (staffMembers.length === 0) {
      return NextResponse.json({ message: "No staff found for the given role" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Staff fetched successfully",
      staffMembers,
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching staff:", error);
    return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
  }
}
