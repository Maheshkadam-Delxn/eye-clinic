"use client";

import { useState } from "react";
import { Home, Bell, Phone, User, Users, UserPlus , Settings, Calendar, ChartNoAxesCombined, CreditCard, ChevronDown } from "lucide-react";
import CalendarComponent from "@/components/CalendarComponent"; // Adjust based on location
import Image from 'next/image';
import DocSideBar from "../../../components/DocSideBar";


export default function DoctorDashboard() {
    const [activeItem, setActiveItem] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState("Dr. Ana Doe");
    const [selectedDate, setSelectedDate] = useState(new Date());

    const timeSlots = {
        morning: ["8:00 AM - 8:30 AM", "8:30 AM - 9:00 AM", "9:00 AM - 9:30 AM", "9:30 AM - 10:00 AM", "10:00 AM - 10:30 AM"],
        afternoon: ["12:00 PM - 12:30 PM", "12:30 PM - 1:00 PM", "1:00 PM - 1:30 PM", "1:30 PM - 2:00 PM", "2:00 PM - 2:30 PM"],
        evening: ["4:00 PM - 4:30 PM", "4:30 PM - 5:00 PM", "5:00 PM - 5:30 PM", "5:30 PM - 6:00 PM", "6:00 PM - 6:30 PM", "6:30 PM - 7:00 PM", "7:00 PM - 7:30 PM", "7:30 PM - 8:00 PM", "8:00 PM - 8:30 PM"]
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <DocSideBar />

            {/* Main Content */}
            <div className="flex-1 p-6 ml-64">
                <header className="flex justify-between items-center bg-blue-600 p-4 mb-3 rounded-lg shadow-md">
                    <h1 className="text-white text-lg font-bold">Appointments</h1>
                    <div className="flex flex-row space-x-4">
                        <input
                            type="text"
                            placeholder="Search"
                            className="px-4 py-2 rounded-md focus:ring outline-none "
                        />
                        <div className="items-center justify-center flex flex-row gap-4">
                            
                            <User className="text-white" />
                        </div>
                    </div>
                </header>



                <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row ">
                    {/* Left Section: Doctor's Image */}
                    <div className="relative w-full md:w-1/2">
                        <Image
                            src="/images/doctor.png" // Change this to the correct image path
                            alt="Dr. Roshini Patel"
                            width={300}
                            height={300}
                            className="object-cover"
                        />
                        <div className="absolute bottom-0 bg-blue-600 text-white text-center py-3 w-full">
                            <h2 className="text-xl font-bold">Dr. Roshini Patel</h2>
                            <p className="text-sm">Ophthalmologist</p>
                        </div>
                    </div>
                    <div className="p-6 w-full md:w-1/2">
                        {/* Profile Section */}
                        <h3 className="text-blue-600 text-lg font-semibold">PROFILE</h3>
                        <p className="text-gray-700 font-bold text-xl">Dr. Roshini Patel</p>
                        <p className="text-gray-600 text-sm">Ophthalmologist</p>
                        <p className="text-gray-500 text-sm">M.S. (Ophthalmology), F.R.C.S. (Glasgow) Visionary Eye Clinic, Deccan Gymkhana, Pune, India</p>

                        {/* Specialty Section */}
                        <h3 className="mt-4 text-blue-600 text-lg font-semibold">SPECIALTY</h3>
                        <div className="flex flex-wrap gap-2">
                            {['Cataract Surgery', 'Glaucoma Management', 'Retinal Disorders', 'Laser Vision Correction'].map((specialty) => (
                                <span key={specialty} className="bg-gray-200 text-gray-700 px-3 py-1 text-sm rounded-full">{specialty}</span>
                            ))}
                        </div>

                        {/* Experience & Other Info */}
                        <h3 className="mt-4 text-blue-600 text-lg font-semibold">EXPERIENCE</h3>
                        <p className="text-gray-700">22 Years+</p>

                        <h3 className="mt-4 text-blue-600 text-lg font-semibold">LANGUAGES</h3>
                        <p className="text-gray-700">English, Hindi, Marathi</p>
                        <div className="flex  justify-end items-end">

                            <a href="/DOCTOR/doctors_list">
                                <button className=" mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Back</button>
                            </a>
                        </div>
                    </div>
                </div>




            </div>
        </div>
    );
}

// Sidebar Components
function NavItem({ Icon, label, activeItem, setActiveItem }) {
    const isActive = activeItem === label;
    return (
        <div className={`flex items-center space-x-3 cursor-pointer px-4 py-2 rounded-md transition ${isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-blue-100"}`} onClick={() => setActiveItem(label)}>
            <Icon size={20} />
            <span>{label}</span>
        </div>
    );
}

function DropdownNavItem({ Icon, label, items, activeItem, setActiveItem }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="relative">
            <div className={`flex items-center justify-between cursor-pointer px-4 py-2 rounded-md transition ${activeItem === label ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-100"}`} onClick={() => { setOpen(!open); setActiveItem(label); }}>
                <div className="flex items-center space-x-3">
                    <Icon size={20} />
                    <span>{label}</span>
                </div>
                <ChevronDown size={18} className={`${open ? "rotate-180" : ""} transition-transform`} />
            </div>
            {open && (
                <div className="mt-2 bg-white shadow-md rounded-md w-full">
                    {items.map((item, index) => (
                        <div key={index} className="px-4 py-2 text-gray-700 hover:bg-blue-100 cursor-pointer transition">{item}</div>
                    ))}
                </div>
            )}
        </div>
    );
}
