"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DoctorLayout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login"); // Redirect to login if no token
    } else {
      setLoading(false); // Allow rendering if token exists
    }
  }, []);

  if (loading) return <p>Loading...</p>; // Prevent flickering

  return <>{children}</>;
}
