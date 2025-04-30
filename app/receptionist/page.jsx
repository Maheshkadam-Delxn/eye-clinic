"use client";

import { useState } from "react";
import { Home, Bell, Phone, User, Settings, Calendar, Users, CreditCard, ChevronDown } from 'lucide-react';


export default function BookAppointment() {
    const [activeItem, setActiveItem] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        age: "",
        phone: "",
        gender: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex h-screen">
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
            {/* Header */}

            <div className="flex-1">
                <div className="flex-1 p-6 ml-64">
                    <header className="flex justify-between items-center bg-blue-600 p-4 rounded-lg shadow-md">
                        <h1 className="text-white text-lg font-bold">Book An Appointment</h1>
                        <div className="flex space-x-4">
                            <input
                                type="text"
                                placeholder="Search"
                                className="px-4 py-2 rounded-md focus:ring outline-none"   
                            />
                            <Bell className="text-white" />
                            <Phone className="text-white" />
                            <User className="text-white" />
                        </div>
                    </header>
                </div>



                {/* Form */}
                <div className="p-10 ml-64">
                    <h1 className="text-3xl font-bold">Book Appointment</h1>
                    <h2 className="text-xl font-semibold mt-4">Patient Details</h2>

                    <div className="grid grid-cols-3 gap-6 mt-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter Name"
                            className="p-2 border rounded"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            className="p-2 border rounded"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <select
                            name="gender"
                            className="p-2 border rounded"
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <option value="">Enter Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        <input
                            type="number"
                            name="age"
                            placeholder="Enter Age"
                            className="p-2 border rounded"
                            value={formData.age}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Enter Mob No."
                            className="p-2 border rounded"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex space-x-4 mt-6">
                        <a href="/rec_appointment">
                        <button className="bg-blue-600 text-white px-6 py-2 rounded">Continue</button>

                        </a>
                        <button className="bg-gray-300 px-6 py-2 rounded">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}


function NavItem({ Icon, label, activeItem, setActiveItem }) {
    const isActive = activeItem === label;
    return (
        <div
            className={`flex items-center space-x-3 cursor-pointer px-4 py-2 rounded-md transition ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-100'
                }`}
            onClick={() => setActiveItem(label)}
        >
            <Icon size={20} />
            <span>{label}</span>
        </div>
    );
}

function DropdownNavItem({ Icon, label, items, activeItem, setActiveItem }) {
    const [open, setOpen] = useState(false);
    const isActive = activeItem === label;

    return (
        <div className="relative">
            <div
                className={`flex items-center justify-between cursor-pointer px-4 py-2 rounded-md transition ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-100'
                    }`}
                onClick={() => {
                    setOpen(!open);
                    setActiveItem(label);
                }}
            >
                <div className="flex items-center space-x-3">
                    <Icon size={20} />
                    <span>{label}</span>
                </div>
                <ChevronDown size={18} className={`${open ? 'rotate-180' : ''} transition-transform`} />
            </div>
            {open && (
                <div className="mt-2 bg-white shadow-md rounded-md w-full">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="px-4 py-2 text-gray-700 hover:bg-blue-100 cursor-pointer transition"
                        >
                            {item}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
