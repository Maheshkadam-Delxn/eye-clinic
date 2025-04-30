// import jwt from "jsonwebtoken";
// import { NextResponse } from "next/server";
// import connectDB from "@/app/lib/db/connection";
// import Receptionist from "@/app/models/Receptionist";
// import Doctor from "@/app/models/Doctor";

// export async function DELETE(req) {
//   try {
//     await connectDB(); // Ensure DB connection

//     // Extract token from headers
//     const authHeader = req.headers.get("authorization");
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return NextResponse.json({ message: "Unauthorized: No token provided" }, { status: 401 });
//     }

//     const token = authHeader.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Check if the user is an admin doctor
//     const adminDoctor = await Doctor.findById(decoded.userId);
//     if (!adminDoctor || !adminDoctor.isAdmin) {
//       return NextResponse.json({ message: "Unauthorized: Only admin doctors can add receptionists" }, { status: 403 });
//     }

//     // Extract receptionist email from request body
//     const { email } = await req.json();

//     // Check if receptionist exists
//     const existingReceptionist = await Receptionist.findOne({ email });
//     if (!existingReceptionist) {
//       return NextResponse.json({ message: "Receptionist not found" }, { status: 404 });
//     }

//     // Remove receptionist from database
//     await Receptionist.deleteOne({ email });

//     return NextResponse.json({ message: "Receptionist role removed successfully" }, { status: 200 });

//   } catch (error) {
//     console.error("Error removing receptionist:", error);
//     return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
//   }
// }
