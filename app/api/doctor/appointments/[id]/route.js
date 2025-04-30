import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db/connection";
import Appointment from "../../../../models/Appoinment";
import Patient from "../../../../models/Patient";
import jwt from "jsonwebtoken";
export async function GET(req, context) {
  try {
    await connectDB();

    // Extract token to get doctorId
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized: No token provided" }, { status: 401 });
    }
    
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const doctorId = decoded.userId; // Extract doctorId from token

    // Extract `id` from params correctly in Next.js 15
    const { id } = await context.params;  
    console.log("Appointment ID:", id); // Debugging log


    // Fetch appointment details assigned to the logged-in doctor
    const appointment = await Appointment.findOne({ _id: id, doctorId: doctorId })
      .select("patientName patientPhone patientEmail age gender reason appointmentDateTime doctor");

    if (!appointment) {
      return NextResponse.json({ message: "Appointment not found or not assigned to you" }, { status: 404 });
    }

    // Fetch patient details using the patient's phone number
    const patient = await Patient.findOne({ phone: appointment.patientPhone })
      .select("name phone email age gender");

    return NextResponse.json({
      message: "Patient details fetched successfully",
      appointment,
      patient,
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching patient details:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
