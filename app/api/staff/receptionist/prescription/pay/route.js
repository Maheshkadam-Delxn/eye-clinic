import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/db/connection";
import Prescription from "../../../../../models/Prescription";
import jwt from "jsonwebtoken";
import Appointment from "../../../../../models/Appoinment";

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
    console.log("Decoded JWT:", decoded); 
    // Ensure only a receptionist can process payments
    if (decoded.role !== "receptionist") {
      return NextResponse.json({ message: "Unauthorized: Only receptionists can process payments" }, { status: 403 });
    }

    const { prescriptionId, appointmentId } = await req.json();
    if (!prescriptionId) {
      return NextResponse.json({ message: "Prescription ID is required" }, { status: 400 });
    }

    // Update the prescription to mark it as paid
    const updatedPrescription = await Prescription.findByIdAndUpdate(
      prescriptionId,
      { status: "paid", processedBy: decoded.userId },
      { new: true }
    );
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status: "paid", processedBy: decoded.userId },
      { new: true }
    );

    if (!updatedPrescription) {
      return NextResponse.json({ message: "Prescription not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Payment processed successfully", prescription: updatedPrescription , appointment: updatedAppointment}, { status: 200 });

  } catch (error) {
    console.error("Error processing payment:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
