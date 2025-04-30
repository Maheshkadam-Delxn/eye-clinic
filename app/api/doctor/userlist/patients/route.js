import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db/connection";
import Patient from "../../../../models/Patient"; // Adjust the path as necessary

export async function GET() {
  try {
    await connectDB(); // Ensure DB connection

    const patients = await Patient.find().select("name email age gender");

    return NextResponse.json({
      message: "Patients retrieved successfully",
      patients,
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching patients:", error);
    return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
  }
}
