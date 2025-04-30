import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const response = NextResponse.json({ message: "Logout successful" });

    // Expire token
    response.cookies.set("token", "", {
      expires: new Date(0),
      httpOnly: true,
      path: "/",
      maxAge: 0
    });

    return response;
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
