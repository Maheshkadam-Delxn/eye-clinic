'use client';

import { useState } from 'react';
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from 'lucide-react';

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
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
            const res = await fetch("/api/auth/sign-in", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (res.ok) {
                // Store JWT token in local storage
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", data.user.role);

                // Redirect user based on role
                switch (data.user.role) {
                    case "doctor":
                        router.push("/DOCTOR/doc_dashboard");
                        break;
                    case "receptionist":
                        router.push("/RECEPTIONIST/rec_dashboard");
                        break;
                    case "eyewear_employee":
                        router.push("/EYEWEAR/eyewear_dashboard");
                        break;
                    case "patient":
                        router.push("/PATIENT/patient_dashboard");
                        break;
                    default:
                        setError("Invalid role. Contact admin.");
                        break;
                }
            } else {
                setError(data.message || "Login failed");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen" style={{ backgroundImage: "url('/images/b7.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>

            <div className="relative bg-white p-8 rounded-2xl shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center text-gray-900">Eye Care Clinic</h2>
                <p className="text-lg font-semibold text-center text-gray-700">Login</p>

                {error && <p className="text-red-500 text-center">{error}</p>}

                <form className="mt-4 text-black space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700 font-medium">Username *</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter Your Username"
                            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="relative">
                        <label className="block text-gray-700 font-medium">Your Password *</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter Password"
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

                    {/* <a href="/forgot-password">
                        <p className="text-right text-sm text-blue-600 cursor-pointer">Forgot Password?</p>
                    </a> */}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <a href="/signup">
                        <p className="text-center text-sm text-gray-600 p-2">
                            Not Registered? <span className="text-blue-600 cursor-pointer">Sign Up</span>
                        </p>
                    </a>
                </form>
            </div>
        </div>
    );
}