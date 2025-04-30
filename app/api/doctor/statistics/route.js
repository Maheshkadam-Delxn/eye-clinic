import { NextResponse } from "next/server";
import connectDB from "../../../lib/db/connection";
import Appointment from "../../../models/Appoinment";
import Patient from "../../../models/Patient";

export async function GET() {
  try {
    await connectDB(); // Ensure DB connection

    // Get total number of patients
    const totalPatients = await Patient.countDocuments();

    // Get total number of appointments
    const totalAppointments = await Appointment.countDocuments();

    // Get today's date in YYYY-MM-DD format
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0]; // Format: "YYYY-MM-DD"

    console.log("Filtering appointments for date:", todayStr);

    // Get today's appointments
    const todaysAppointments = await Appointment.countDocuments({
      appointmentDate: todayStr
    });

    // Get today's unique patients
    const todaysPatients = await Appointment.distinct("patientPhone", {
      appointmentDate: todayStr
    });

    return NextResponse.json({
      message: "Statistics retrieved successfully",
      totalPatients,
      totalAppointments,
      todaysAppointments,
      todaysPatients: todaysPatients.length, // Unique patients count
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching statistics:", error);
    return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
  }
}
