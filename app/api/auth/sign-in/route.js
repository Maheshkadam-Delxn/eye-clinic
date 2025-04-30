import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import connectDB from "../../../lib/db/connection.js";
import Staff from "../../../models/Staff.js";

export async function POST(req) {
  try {
    await connectDB(); // Ensure DB connection

    const { username, password } = await req.json();

    let user = null;
    let urole = "";

      user = await Staff.findOne({ username });
      if (user) {
        urole = user.role;
      }

    // 🔹 If user not found in any collection
    if (!user) {
      return NextResponse.json({ message: "Invalid username or password" }, { status: 401 });
    }

    // 🔹 Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid username or password" }, { status: 401 });
    }

    // 🔹 Generate JWT Token with role
    const token = jwt.sign(
      { userId: user._id, role: urole, isAdmin: user.isAdmin || false },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 🔹 Common response structure
    return NextResponse.json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        phone: user.phone,
        role: urole,
        isAdmin: user.isAdmin || false,
      },
      token,
    });

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
