import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db/connection";
import Prescription from "../../../../models/Prescription";
import jwt from "jsonwebtoken";

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
    const doctorId = decoded.userId; // Extract doctor ID from token

    // Parse request body
    const { appointmentId, patientId, medications, spectacles, additionalAdvice, followUpDate } = await req.json();

    // Validate required fields
    if (!appointmentId || !patientId || !medications.length) {
      return NextResponse.json({ message: "Appointment ID, Patient ID, and at least one medication are required" }, { status: 400 });
    }

    // Create prescription
    const newPrescription = new Prescription({
      appointmentId,
      doctorId,
      patientId,
      medications,
      spectacles,
      additionalAdvice,
      followUpDate
    });

    await newPrescription.save();

    return NextResponse.json({ message: "Prescription created successfully", prescription: newPrescription }, { status: 201 });

  } catch (error) {
    console.error("Error creating prescription:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
