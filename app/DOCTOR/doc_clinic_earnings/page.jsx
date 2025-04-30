"use client";

import { useState } from "react";
import { Home, Bell, Phone, User, Settings, Calendar, Users, ChartNoAxesCombined, UserPlus, CreditCard, ChevronDown } from "lucide-react";
import CalendarComponent from "@/components/CalendarComponent"; // Adjust based on location

export default function DoctorDashboard() {
    const [activeItem, setActiveItem] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState("Dr. Anand Nair");
    const [selectedDate, setSelectedDate] = useState(new Date());

    const timeSlots = {
        morning: ["8:00 AM - 8:30 AM", "8:30 AM - 9:00 AM", "9:00 AM - 9:30 AM", "9:30 AM - 10:00 AM", "10:00 AM - 10:30 AM"],
        afternoon: ["12:00 PM - 12:30 PM", "12:30 PM - 1:00 PM", "1:00 PM - 1:30 PM", "1:30 PM - 2:00 PM", "2:00 PM - 2:30 PM"],
        evening: ["4:00 PM - 4:30 PM", "4:30 PM - 5:00 PM", "5:00 PM - 5:30 PM", "5:30 PM - 6:00 PM", "6:00 PM - 6:30 PM", "6:30 PM - 7:00 PM", "7:00 PM - 7:30 PM", "7:30 PM - 8:00 PM", "8:00 PM - 8:30 PM"]
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white p-6 shadow-lg h-screen fixed">
                <div className="flex items-center space-x-3 ">
                    <img
                        src="/images/Doc-logo.png"
                        alt="Doctor Name"
                        className="w-10 h-10 rounded-full"
                    />
                    <div>
                        <h4 className="text-gray-900 text- font-semibold">Dr. Anand Nair</h4>
                        <p className="text-sm text-gray-500">Eye Care Specialist</p>
                    </div>
                </div>
                <nav className="mt-8 ">
                    <ul className="space-y-5 mb-5">
                        <li>
                            <a href="/DOCTOR/doc_dashboard">
                                <NavItem Icon={Home} label="Doctor Dashboard" activeItem={activeItem} setActiveItem={setActiveItem} isActivetext={true} />
                            </a>
                        </li>
                        <li>
                            <a href="/DOCTOR/doc_appointment">
                                <NavItem Icon={Calendar} label="Appointments" activeItem={activeItem} setActiveItem={setActiveItem} />
                            </a>
                        </li>
                        <li>
                            <a href="/DOCTOR/doctors_list">
                                <NavItem Icon={User} label="Doctor's List" activeItem={activeItem} setActiveItem={setActiveItem} />
                            </a>
                        </li>
                        {/* <li>
                                <a href="">
                                    <NavItem Icon={CreditCard} label="Payment" activeItem={activeItem} setActiveItem={setActiveItem} />
                                </a>
                            </li> */}
                        <DropdownNavItem
                            Icon={Users}
                            label="Roles"
                            items={[{
                                "name": "Doctors",
                                "Routes": "/DOCTOR/roles_doc"
                            },
                            {
                                "name": "Receptionists",
                                "Routes": "/DOCTOR/roles_receptionist"
                            },
                            {
                                name: "Eye-wear Employee",
                                Routes: "/DOCTOR/roles_patient"
                            }]}
                            activeItem={activeItem}
                            setActiveItem={setActiveItem}
                        />
                        <DropdownNavItem
                            Icon={Users}
                            label="Patients"
                            items={[{
                                "name": "Registered",
                                "Routes": "/DOCTOR/patients_registered"
                            },
                            {
                                "name": "Unregistered",
                                "Routes": "/DOCTOR/patients_unregistered"
                            }]}
                            activeItem={activeItem}
                            setActiveItem={setActiveItem}
                        />

                        <li>
                            <a href="/DOCTOR/doc_newuser">
                                <NavItem Icon={UserPlus} label="Create New User" activeItem={activeItem} setActiveItem={setActiveItem} />
                            </a>
                        </li>
                        <li>
                            <a href="/DOCTOR/doc_clinic_earnings">
                                <NavItem Icon={ChartNoAxesCombined} label="Clinic Earnings" activeItem={activeItem} setActiveItem={setActiveItem} />
                            </a>
                        </li>
                        <li>
                            <a href="/login">
                                <NavItem Icon={Settings} label="Logout" activeItem={activeItem} setActiveItem={setActiveItem} />
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 p-6 ml-64">
                <header className="flex justify-between items-center bg-blue-600 p-4 rounded-lg shadow-md">
                    <h1 className="text-white text-lg font-bold">Clinic Earnings</h1>
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

                {/* Clinic Earnings */}
                <section className="mt-11 p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-gray-900 text-xl font-bold">Clinic Earnings</h3>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <EarningsCard img="\images\consultation.png" label="Consultation" amount={4300} />
                        <EarningsCard img="\images\purchases.png" label="Overall Purchases" amount={4300} />
                        <EarningsCard img="\images\bill.png" label="Eye Wear Billing" amount={4300} />
                        <EarningsCard img="\images\graph-bill.png" label="Monthly Billing" amount={4300} />
                    </div>
                </section>
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

function EarningsCard({ img, label, amount }) {
    return (
        <div className="p-2 bg-white border gap-4 rounded-lg flex items-center justify-center space-x-4 w-100">
            <img src={img} alt="" className="h-24   w-24 p-3" />
            <div>
                <p className="text-xl font-bold text-gray-900 text-center flex justify-center items-center" >₹ {amount}</p>
                <p className="text-gray-600 text-lg">{label}</p>
            </div>
        </div>
    );
}
