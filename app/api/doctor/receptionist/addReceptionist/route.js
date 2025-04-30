// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import { NextResponse } from "next/server";
// import connectDB from "../../../../lib/db/connection.js";
// import Receptionist from "../../../../models/Receptionist.js";
// import Doctor from "../../../../models/Doctor.js";

// export async function POST(req) {
//   try {
//     await connectDB(); // Ensure DB connection

//     // 🔹 Extract token from headers
//     const authHeader = req.headers.get("authorization");
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return NextResponse.json({ message: "Unauthorized: No token provided" }, { status: 401 });
//     }

//     const token = authHeader.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // 🔹 Check if the user is an admin doctor
//     const adminDoctor = await Doctor.findById(decoded.userId);
//     if (!adminDoctor || !adminDoctor.isAdmin) {
//       return NextResponse.json({ message: "Unauthorized: Only admin doctors can add receptionists" }, { status: 403 });
//     }

//     // 🔹 Get receptionist data from request body
//     const { name, email, password, phone } = await req.json();

//     // Check if the receptionist already exists
//     const existingReceptionist = await Receptionist.findOne({ email });
//     if (existingReceptionist) {
//       return NextResponse.json({ message: "Receptionist already registered" }, { status: 400 });
//     }

//     // Hash password before saving
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new receptionist
//     const newReceptionist = new Receptionist({
//       name,
//       email,
//       password: hashedPassword,
//       phone,
//     });

//     await newReceptionist.save();

//     return NextResponse.json({
//       message: "Receptionist registered successfully",
//       receptionist: {
//         _id: newReceptionist._id,
//         name: newReceptionist.name,
//         email: newReceptionist.email,
//         phone: newReceptionist.phone,
//       },
//     }, { status: 201 });

//   } catch (error) {
//     console.error("Signup error:", error);
//     return NextResponse.json({ message: "Internal server error" }, { status: 500 });
//   }
// }
