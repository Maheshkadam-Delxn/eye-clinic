import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db/connection";
import Prescription from "../../../../models/Prescription";
import jwt from "jsonwebtoken";

// 📌 GET Prescription by ID
export async function GET(req, { params }) {
  try {
    await connectDB();
    
    const { id } = params; // Get prescription ID from URL
    
    const prescription = await Prescription.findById(id);
    if (!prescription) {
      return NextResponse.json({ message: "Prescription not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Prescription fetched", prescription }, { status: 200 });
    
  } catch (error) {
    console.error("Error fetching prescription:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// 📌 PATCH - Update Prescription by ID
export async function PATCH(req, { params }) {
  try {
    await connectDB();

    // Extract token from headers
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized: No token provided" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const doctorId = decoded.userId; // Ensure only a doctor can update

    const { id } = params; // Get prescription ID from URL
    const updateData = await req.json();

    const updatedPrescription = await Prescription.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedPrescription) {
      return NextResponse.json({ message: "Prescription not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Prescription updated", prescription: updatedPrescription }, { status: 200 });

  } catch (error) {
    console.error("Error updating prescription:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// 📌 DELETE - Remove Prescription by ID
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { id } = params; // Get prescription ID from URL

    const deletedPrescription = await Prescription.findByIdAndDelete(id);
    if (!deletedPrescription) {
      return NextResponse.json({ message: "Prescription not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Prescription deleted successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error deleting prescription:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
