'use client';

import { useState } from 'react';
import { useRouter } from "next/navigation";
import { Eye, EyeOff, User, Mail, Phone, Shield, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="flex items-center justify-center py-8 bg-blue-50" 
         style={{ 
           backgroundImage: "url('/images/b8.jpg')", 
           backgroundSize: 'cover', 
           backgroundPosition: 'center',
           minHeight: '680px', // Fixed reasonable height instead of full screen
           maxHeight: '800px'  // Maximum height limit
         }}>
      
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 to-black/50 backdrop-blur-sm"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl w-full max-w-md mx-4"
      >
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-blue-600 rounded-full p-3 shadow-lg">
          <svg viewBox="0 0 24 24" width="28" height="28" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-gray-900 mt-6">Eye Care Clinic</h2>
        <p className="text-base font-medium text-center text-blue-600 mt-0">Create Your Account</p>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 bg-red-50 border-l-4 border-red-500 p-2 rounded-md"
          >
            <p className="text-red-700 text-xs flex items-center">
              <span className="mr-2">⚠️</span>
              {error}
            </p>
          </motion.div>
        )}

        <motion.form 
          className="mt-4 space-y-3" 
          onSubmit={handleSubmit}
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <label className="block text-gray-700 text-sm font-medium mb-1">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                name="username"
                placeholder="user"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          </motion.div>

          <motion.div variants={item}>
            <label className="block text-gray-700 text-sm font-medium mb-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={16} className="text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="your.email@example.com"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </motion.div>

          <motion.div variants={item}>
            <label className="block text-gray-700 text-sm font-medium mb-1">Phone Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                name="phone"
                placeholder="+91 8805203789"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-3">
            <motion.div variants={item}>
              <label className="block text-gray-700 text-sm font-medium mb-1">I am a</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Shield size={16} className="text-gray-400" />
                </div>
                <select
                  name="role"
                  className="w-full pl-10 pr-3 py-2 border text-gray-700 border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >                 
                 <option value="receptionist">Receptionist</option>
                  <option value="doctor">Doctor</option>
                  <option value="eyewear_employee">Eyewear Specialist</option>
                  {/* <option value="patient">Patient</option> */}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </motion.div>

            <motion.div className="relative" variants={item}>
              <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </motion.div>
          </div>

          <motion.button
            variants={item}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/30 mt-2"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Creating Account...</span>
              </div>
            ) : (
              <div className="flex items-center">
                <span>Create Account</span>
                <ArrowRight size={16} className="ml-2" />
              </div>
            )}
          </motion.button>

          <motion.div variants={item} className="text-center text-sm">
            <p className="text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                Log in
              </a>
            </p>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
}