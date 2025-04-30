import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db/connection";
import User from "@/app/models/User";

export async function GET() {
  try {
    await connectDB(); // Ensure DB connection

    const users = await User.find().select("name email role");
    // Map users to include role based on isAdmin flag
    const formattedUsers = users.map(user => ({
      name: user.name,
      email: user.email,
      role: user.role,
    }));

    return NextResponse.json({
      message: "Users retrieved successfully",
      users: formattedUsers,
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
  }
}