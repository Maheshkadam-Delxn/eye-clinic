import jwt from "jsonwebtoken";
import Doctor from "../../../../app/models/Doctor.js"
import { NextResponse } from "next/server";
import connectDB from "../../../lib/db/connection.js";
import bcrypt from "bcryptjs";
import Staff from "../../../models/Staff.js";
// 🔹 Doctor Signup API (Next.js)
export async function POST(req) {
  try {
    await connectDB(); // Ensure DB connection

    const { username, email, password, phone , role} = await req.json();
    // Check if this is the first doctor
    const isFirstDoctor = (await Staff.countDocuments()) === 0;

    // Create doctor with admin rights if first user
    let someone;
    // Check if doctor already exists
    const existingDoctor = await Staff.findOne({ email });
    if (existingDoctor) {
      return NextResponse.json({ message: "Staff already registered" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
      const newDoctor = new Staff({
        username,
        email,
        password : hashedPassword, // hash this before saving
        phone,
        isAdmin: isFirstDoctor, // First doctor becomes admin
        role,
      });
      
      await newDoctor.save();
      someone = newDoctor;
    if (!someone) {
      return NextResponse.json({ message: "User creation failed" }, { status: 500 });
    }    
      
    // Generate JWT token
    const token = jwt.sign(
      { userId: someone._id, role: someone.role, isAdmin: someone.isAdmin || false },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    

    return NextResponse.json({
      message: "User registered successfully",
      someone: {
        _id: someone._id,
        username: someone.username,
        email: someone.email,
        phone: someone.phone,
        isAdmin: someone.isAdmin || false,
        role: someone.role,
      },
      token,
    }, { status: 201 });

  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

