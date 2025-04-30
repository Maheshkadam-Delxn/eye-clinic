"use client";

import { useState, useEffect } from "react";
import { Home, Bell, Phone, User, Settings, Calendar, Users, ChartNoAxesCombined, UserPlus, CreditCard, ChevronDown } from "lucide-react";
import DocSideBar from "../../../components/DocSideBar";

export default function DashboardSideBar() {
    const [activeItem, setActiveItem] = useState(null);
    const [stats, setStats] = useState({
        todaysPatients: 0,
        todaysAppointments: 0,
        totalPatients: 0,
        totalAppointments: 0,
    });

    useEffect(() => {
        async function fetchStats() {
            try {
                const response = await fetch("/api/doctor/statistics");
                if (!response.ok) throw new Error("Failed to fetch statistics");
                
                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error("Error fetching statistics:", error);
            }
        }
        fetchStats();
    }, []);
    return (

        <div className="flex h-screen bg-white">
            {/* Sidebar */}
            <DocSideBar />
            {/* Main Content */}
            <div className="flex-1 p-6 ml-64 items-center justify-center">
                <header className="flex justify-between items-center bg-blue-600 p-4 rounded-lg shadow-md">
                    <h1 className="text-white text-lg font-bold">Dashboard</h1>
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

                {/* Welcome Section */}
                <section className="bg-white p-6 rounded-lg shadow-md mt-6" style={{ backgroundImage: "url('/images/welcome_sec.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <h2 className="text-white text-xl font-semibold">Good Morning,</h2>
                    <h3 className="text-white text-2xl font-bold">Dr. Anand Nair</h3>
                    <p className="text-gray-100 mt-2">
                        You have Total <span className="text-blue-400 p-1 cursor-pointer font-bold text-xl">{stats.todaysAppointments}</span> Appointments Today.
                    </p>
                    <div className="flex space-x-6 mt-4">
                        <StatCard label="Patients" count={stats.todaysPatients} />
                        <CalendarCard label="Appointments" count= {stats.todaysAppointments} />
                    </div>
                </section>

                {/* Statistics Section */}
                <section className="mt-6 grid grid-cols-2 gap-4">
                    <InfoCard1 title="Patients Visited" count={stats.totalPatients} />
                    <InfoCard2 title=" Upcoming Appointments" count={stats.totalAppointments} />
                </section>

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

// Navigation Item Component
function NavItem({ Icon, label, activeItem, setActiveItem, isActivetext }) {
    const isActive = activeItem === label;
    // const isActiveText = isActivetext === label;
    return (
        <div
            className={`flex items-center space-x-3 cursor-pointer px-4 py-2 rounded-md transition ${isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-blue-100"
                } ${isActivetext ? "bg-blue-600 text-white hover:bg-blue-600" : "text-gray-700"}`}
            onClick={() => setActiveItem(label)}
        >
            <Icon size={20} />
            <span>{label}</span>
        </div>
    );
}

// Dropdown Navigation Item Component



// Cards for Statistics & Earnings
function StatCard({ label, count }) {
    return (
        <div className="p-4 rounded-lg flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-500 flex items-center justify-center rounded-lg">
                <Users className="text-white" size={40} />
            </div>
            <div>
                <p className="text-3xl font-bold text-white">{count} </p>
                <p className="text-white text-lg">{label}</p>
            </div>
        </div>
    );
}
function CalendarCard({ label, count }) {
    return (
        <div className="p-4 rounded-lg flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-500 flex items-center justify-center rounded-lg">
                <Calendar className="text-white" size={40} />
            </div>
            <div>
                <p className="text-3xl font-bold text-white">{count}</p>
                <p className="text-white text-lg">{label}</p>
            </div>
        </div>
    );
}

function InfoCard1({ title, count }) {
    return (
        <div className="p-6 bg-blue-100 rounded-lg shadow-md flex flex-col items-center">

            <div className="flex items-center space-x-4">
                <div>
                    <User className="text-blue-700 w-16 h-16 p-2 border-2 border-blue-700 rounded-full" size={40} />

                </div>
                <div>
                    <p className="text-blue-700 text-4xl font-bold mt-2">{count}</p>
                    <p className="text-gray-600">{title}</p>
                </div>

            </div>
        </div>
    );
}

function InfoCard2({ title, count }) {
    return (
        <div className="p-6 bg-blue-100 rounded-lg shadow-md flex flex-col items-center">

            <div className="flex items-center space-x-4 ">
                <div className="w-16 h-16 p-1 border-2 border-blue-700 rounded-full flex items-center justify-center">            <Calendar className="text-blue-700 " size={40} />
                </div>
                <div >
                    <p className="text-blue-700 text-4xl font-bold mt-2">{count}</p>
                    <p className="text-gray-600">{title}</p>
                </div>
            </div>
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
