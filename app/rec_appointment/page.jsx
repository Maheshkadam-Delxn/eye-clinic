"use client";

import { useState } from "react";
import { Home, Bell, Phone, User, Settings, Calendar, CreditCard, ChevronDown } from "lucide-react";
import CalendarComponent from "@/components/CalendarComponent";
import ConfirmationPopup from "@/components/ConfirmationPopup";

export default function DoctorDashboard() {
    const [activeItem, setActiveItem] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState("Dr. Ana Doe");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

    const handleConfirmClick = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const timeSlots = {
        morning: ["8:00 AM - 8:30 AM", "8:30 AM - 9:00 AM", "9:00 AM - 9:30 AM", "9:30 AM - 10:00 AM", "10:00 AM - 10:30 AM"],
        afternoon: ["12:00 PM - 12:30 PM", "12:30 PM - 1:00 PM", "1:00 PM - 1:30 PM", "1:30 PM - 2:00 PM", "2:00 PM - 2:30 PM"],
        evening: ["4:00 PM - 4:30 PM", "4:30 PM - 5:00 PM", "5:00 PM - 5:30 PM", "5:30 PM - 6:00 PM", "6:00 PM - 6:30 PM", "6:30 PM - 7:00 PM", "7:00 PM - 7:30 PM", "7:30 PM - 8:00 PM", "8:00 PM - 8:30 PM"]
    };

    const handleTimeSlotClick = (slot) => {
        setSelectedTimeSlot(slot);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white p-6 shadow-lg h-screen fixed">
                <div className="flex items-center space-x-3 mb-10">
                    <img
                        src="/images/Doc-logo.png"
                        alt="Doctor Name"
                        className="w-10 h-10 rounded-full"
                    />
                    <div>
                        <h3>WELCOME ,</h3>
                        <h4 className="text-gray-900 text- font-semibold">RECEPTIONIST</h4>
                    </div>
                </div>
                <nav className="mt-8 ">
                    <ul className="space-y-5 mb-5">
                        <li>
                            <a href="">
                                <NavItem Icon={Home} label="Book Appointment" activeItem={activeItem} setActiveItem={setActiveItem} isActivetext={true} />
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <NavItem Icon={Calendar} label="Past Appointments" activeItem={activeItem} setActiveItem={setActiveItem} />
                            </a>
                        </li>
                        <DropdownNavItem
                            Icon={Settings}
                            label="Medical Records"
                            items={["Eye Test Records", "Past Prescriptions"]}
                            activeItem={activeItem}
                            setActiveItem={setActiveItem}
                        />
                        <li>
                            <a href="/doctors_list">
                                <NavItem Icon={User} label="Doctor's List" activeItem={activeItem} setActiveItem={setActiveItem} />
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <NavItem Icon={CreditCard} label="Payment" activeItem={activeItem} setActiveItem={setActiveItem} />
                            </a>
                        </li>
                        <DropdownNavItem
                            Icon={Settings}
                            label="Account Settings"
                            items={["Profile Information", "Change Password", "Notification Preferences", "Logout"]}
                            activeItem={activeItem}
                            setActiveItem={setActiveItem}
                        />
                    </ul>


                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 p-6 ml-64">
                <header className="flex justify-between items-center bg-blue-600 p-4 rounded-lg shadow-md">
                    <h1 className="text-white text-lg font-bold">Appointments</h1>
                    <div className="flex flex-row space-x-4">
                        <input
                            type="text"
                            placeholder="Search"
                            className="px-4 py-2 rounded-md focus:ring outline-none "
                        />
                        <div className="items-center justify-center flex flex-row gap-4">
                            <Bell className="text-white" />
                            <Phone className="text-white" />
                            <User className="text-white" />
                        </div>
                    </div>

                </header>

                <div className="flex mt-6 gap-6 bg-gray-100">
                    {/* Calendar Section */}
                    <div className="w-1/3 bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold mb-4">Select Date</h2>
                        <CalendarComponent selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                        <div className="mt-4">
                            <label className="block text-gray-700 font-medium">Select Doctor</label>
                            <select className="mt-1 p-2 border rounded w-full" value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)}>
                                <option>Dr. Ana Doe</option>
                                <option>Dr. John Watson</option>
                            </select>
                        </div>
                    </div>

                    {/* Time Slots */}
                    <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold">Available Time Slots</h2>
                        <div className="mt-4">
                            {Object.keys(timeSlots).map((period) => (
                                <div key={period} className="mb-4">
                                    <h3 className="font-semibold text-blue-600">{period.charAt(0).toUpperCase() + period.slice(1)}</h3>
                                    <div className="grid grid-cols-3 gap-2 mt-2">
                                        {timeSlots[period].map((slot, index) => (
                                            <button
                                                key={index}
                                                className={`px-3 py-2 rounded text-sm hover:bg-blue-500 hover:text-white ${selectedTimeSlot === slot ? "bg-green-500 text-white" : "bg-gray-200"}`}
                                                onClick={() => handleTimeSlotClick(slot)}
                                            >
                                                {slot}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex space-x-4 mt-6 p-6 justify-end items-end">
                    <a href="/rec_appointment" onClick={(e) => e.preventDefault()}>
                        <button className="bg-blue-600 text-white px-6 py-2 rounded" onClick={handleConfirmClick}>
                            Confirm
                        </button>
                    </a>
                    <button className="bg-gray-300 px-6 py-2 rounded">Cancel</button>
                </div>

                {/* Add the ConfirmationPopup component */}
                <ConfirmationPopup isOpen={isPopupOpen} onClose={closePopup} />
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