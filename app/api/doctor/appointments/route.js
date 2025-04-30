import { NextResponse } from "next/server";
import connectDB from "../../../lib/db/connection";
import Appointment from "../../../models/Appoinment";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    await connectDB();

    // Extract token from headers
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized: No token provided" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const doctorId = decoded.userId; // Extract doctorId from token

    // Extract query parameters for date & time filtering
    const searchParams = req.nextUrl.searchParams;
    const selectedDate = searchParams.get("date"); // Expected format: "YYYY-MM-DD"
    const selectedTimeSlot = convertTo24HourFormat(searchParams.get("time"));

    // Validate query parameters
    if (!selectedDate) {
      return NextResponse.json({ message: "Missing date parameter" }, { status: 400 });
    }
    if (!selectedTimeSlot) {
      return NextResponse.json({ message: "Missing time parameter" }, { status: 400 });
    }

    // Construct query
    const query = { appointmentDate: selectedDate, appointmentTime: selectedTimeSlot };

    // Fetch appointments matching filters
    const filteredAppointments = await Appointment.find(query)
      .select("patientName age gender appointmentDate appointmentTime");

    return NextResponse.json({
      message: "Appointments fetched successfully",
      appointments: filteredAppointments,
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
  }
}

function convertTo24HourFormat(time12h) {
  if (!time12h) return null;
  
  const [time, modifier] = time12h.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  } else if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}
