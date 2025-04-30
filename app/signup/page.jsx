'use client';

import { useState } from 'react';
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from 'lucide-react';

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    role: "patient", // Default role
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Signup successful!");
        router.push("/login"); // Redirect after signup
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen" style={{ backgroundImage: "url('/images/b8.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-900">Eye Care Clinic</h2>
        <p className="text-lg font-semibold text-center text-gray-700">Sign Up</p>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium">Your Name *</label>
            <input
              type="text"
              name="username"
              placeholder="Enter Your username"
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Your Email *</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Your Phone *</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter Your Phone Number"
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Role *</label>
            <select
              name="role"
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="doctor">Doctor</option>
              <option value="receptionist">Receptionist</option>
              <option value="eyewear_employee">Eyewear Employee</option>
              <option value="patient">Patient</option>
            </select>
          </div>

          <div className="relative">
            <label className="block text-gray-700 font-medium">Your Password *</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Your Password"
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 top-6 right-3 flex items-center text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 mt-5 rounded-md hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          <a href="/login">
            <p className="text-center text-sm text-gray-600 p-2">
              Already have an account? <span className="text-blue-600 cursor-pointer">Login</span>
            </p>
          </a>
        </form>
      </div>
    </div>
  );
}
