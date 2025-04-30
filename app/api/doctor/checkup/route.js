import { NextResponse } from "next/server";
import connectDB from "../../../lib/db/connection";
import Appointment from "../../../models/Appoinment";

export async function GET() {
  await connectDB(); // Connect to MongoDB

  try {
    // Get today's date in YYYY-MM-DD format
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const formattedDate = today.toISOString().split("T")[0]; // YYYY-MM-DD

    const appointments = await Appointment.find({
    appointmentDate: formattedDate, // Matches only today's date
    });


    return NextResponse.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { message: "Error fetching appointments" },
      { status: 500 }
    );
  }
}
