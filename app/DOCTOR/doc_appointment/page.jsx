"use client";

import { useState, useEffect } from "react";
import { Home, Bell, Phone, User } from "lucide-react";
import CalendarComponent from "@/components/CalendarComponent";
import DocSideBar from "../../../components/DocSideBar";

export default function DoctorDashboard() {
    const [selectedDate, setSelectedDate] = useState(null); // No default value at first

    useEffect(() => {
        setSelectedDate(new Date()); // Update only after component mounts
    }, []);

    const [selectedDoctor, setSelectedDoctor] = useState("Dr. Anand Nair");
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!selectedDate || !selectedTimeSlot) return;

        const fetchAppointments = async () => {
            setLoading(true);
            setError("");
            try {
                const token = localStorage.getItem("token");
                const formattedDate = selectedDate.getFullYear() + "-" +
                      (selectedDate.getMonth() + 1).toString().padStart(2, "0") + "-" +
                      selectedDate.getDate().toString().padStart(2, "0");

                const formattedTime = convertTo24HourFormat(selectedTimeSlot);

                const response = await fetch(`/api/doctor/appointments?date=${formattedDate}&time=${formattedTime}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const data = await response.json();
                if (response.ok) {
                    setAppointments(data.appointments);
                } else {
                    setError(data.message || "Failed to fetch appointments");
                    console.error("Error fetching appointments:", data.message);
                }
            } catch (error) {
                setError("An error occurred while fetching appointments");
                console.error("Error:", error);
            }
            setLoading(false);
        };

        fetchAppointments();
    }, [selectedDate, selectedTimeSlot]);

    const timeSlots = {
        morning: ["08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM"],
        afternoon: ["12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM"],
        evening: ["04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM"]
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <DocSideBar />
            <div className="flex-1 p-6 ml-64">
                <header className="flex justify-between items-center bg-blue-600 p-4 rounded-lg shadow-md">
                    <h1 className="text-white text-lg font-bold">Appointments</h1>
                    <div className="flex flex-row space-x-4">
                        
                        <input
                            type="text"
                            placeholder="Search"
                            className="px-4 py-2 rounded-md focus:ring outline-none "
                        />
                        <a href="/DOCTOR/doc_profile">
                            <div className="items-center justify-center flex flex-row gap-4 mt-2">

                                <User className="text-white" />
                            </div>
                        </a>    
                    </div>
                </header>

                <div className="flex text-black mt-6 gap-6">
                    <div className="w-1/3 bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold mb-4">Select Date</h2>
                        <CalendarComponent selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                    </div>

                    {/* Time Slots */}
                    <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-lg text-black font-semibold">Available Time Slots</h2>
                        <div className="mt-4 text-black">
                            {Object.keys(timeSlots).map((period) => (
                                <div key={period} className="mb-6">
                                    <h3 className="font-semibold text-blue-600">{period.charAt(0).toUpperCase() + period.slice(1)}</h3>
                                    <div className="grid grid-cols-3 gap-2 mt-2">
                                        {timeSlots[period].map((slot, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedTimeSlot(slot)}
                                                className={`px-3 py-2 rounded text-sm ${selectedTimeSlot === slot ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-blue-500 hover:text-white"}`}
                                            >
                                                {slot}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p className="mt-4 text-red-600">{error}</p>
                        ) : appointments.length > 0 ? (
                            <div className="mt-6 space-y-4">
                                <h3 className="font-semibold text-blue-600">Appointments:</h3>
                                {appointments.map((appt, index) => (
                                    <div key={index} className="p-4 bg-white shadow-md rounded-lg border border-gray-300">
                                        <p className="text-sm"><strong>Patient:</strong> {appt.patientName}</p>
                                        <p className="text-sm"><strong>Age:</strong> {appt.age}</p>
                                        <p className="text-sm"><strong>Gender:</strong> {appt.gender}</p>
                                        <div className="mt-2">
                                            <button className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : selectedTimeSlot && <p className="mt-4">No appointments for this slot.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ✅ Function to convert 12-hour time format to 24-hour format
function convertTo24HourFormat(time12h) {
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) {
        hours += 12;
    } else if (modifier === "AM" && hours === 12) {
        hours = 0;
    }

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}
