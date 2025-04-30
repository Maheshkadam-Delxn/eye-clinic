import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export function verifyAuth(req) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Verify JWT Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Token expired check
    if (decoded.exp * 1000 < Date.now()) {
      return NextResponse.json({ message: "Session expired. Please log in again." }, { status: 401 });
    }

    req.user = decoded;
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 403 });
  }
}
