"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { FaChartLine } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";

import { Home, Bell, Phone, User, Settings, Calendar, Users, ChartNoAxesCombined, CreditCard, ChevronDown } from "lucide-react";
import Image from "next/image";

export default function Dashboard() {
    const [activeItem, setActiveItem] = useState(null);
    const [isActivetext, setIsActivetext] = useState(null);

    return (

        <div className="flex h-screen bg-white">
            {/* Sidebar */}
            <aside className="w-64 bg-white p-6 shadow-lg h-screen fixed">
                <div className="flex items-center space-x-3 ">
                    <img
                        src="/images/eyewear_logo.png"
                        alt="Doctor Name"
                        className="w-10 h-10 rounded-full"
                    />
                    <div>
                        <h4 className="text-gray-900 text- font-semibold">Eye Wear Shop</h4>
                        <p className="text-sm text-gray-500">Best Eye Wears</p>
                    </div>      
                </div>
                <nav className="mt-8 ">
                    <ul className="space-y-5 mb-5">
                        <li>
                            <a href="/doc_dashboard">
                                <NavItem Icon={Home} label="Doctor Dashboard" activeItem={activeItem} setActiveItem={setActiveItem} isActivetext={true} />
                            </a>
                        </li>
                        <li>
                            <a href="/doc_appointment">
                                <NavItem Icon={Calendar} label="Appointments" activeItem={activeItem} setActiveItem={setActiveItem} />
                            </a>
                        </li>
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
                        <li>
                            <a href="/users">
                                <NavItem Icon={Users} label="Users" activeItem={activeItem} setActiveItem={setActiveItem} />
                            </a>
                        </li>
                        <li>
                            <a href="/doc_clinic_earnings">
                                <NavItem Icon={ChartNoAxesCombined} label="Clinic Earnings" activeItem={activeItem} setActiveItem={setActiveItem} />
                            </a>
                        </li>
                    </ul>


                    <DropdownNavItem
                        Icon={Settings}
                        label="Account Settings"
                        items={["Profile Information", "Change Password", "Notification Preferences", "Logout"]}
                        activeItem={activeItem}
                        setActiveItem={setActiveItem}
                    />
                </nav>
            </aside>

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
                        <div className="items-center justify-center flex flex-row gap-4">
                            <Bell className="text-white" />
                            <Phone className="text-white" />
                            <User className="text-white" />
                        </div>
                    </div>
                </header>

                <div className="bg-[#F3ECFD] p-6">
                    {/* Welcome Section */}
                    <div className="relative bg-white rounded-lg overflow-hidden shadow-lg">
                        <Image
                            src="/images/eyewear.png"
                            alt="Eyewear Display"
                            width={1920}
                            height={1080}
                            className="w-full h-60 object-cover"
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex flex-col justify-center p-6">
                            <h3 className="text-white text-lg">Good Morning,</h3>
                            <h2 className="text-white text-2xl font-bold">Mr. Jon Doe</h2>
                            <div className="mt-4 flex gap-4">
                                <button className="bg-[#2DE2E6] text-black font-semibold py-2 px-4 rounded-lg">Available Stock</button>
                                <button className="bg-[#2DE2E6] text-black font-semibold py-2 px-4 rounded-lg">Update Stock</button>
                                <button className="bg-[#2DE2E6] text-black font-semibold py-2 px-4 rounded-lg">Add Stock</button>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            {/* Eye Glasses Card */}
                            <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="bg-[#CFF9FE] p-4 rounded-full">
                                        <span className="text-2xl">♿</span>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-900">Eye Glasses</h4>
                                        <a href="#" className="text-blue-600 text-sm font-semibold">View All →</a>
                                    </div>
                                </div>
                            </div>

                            {/* Lenses Card */}
                            <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="bg-[#CFF9FE] p-4 rounded-full">
                                        <span className="text-2xl">♿</span>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-900">8 Lenses</h4>
                                        <a href="#" className="text-blue-600 text-sm font-semibold">View All →</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#F3ECFD] p-6">
      {/* Eye Wear Earnings Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Eye Wear Earnings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Total Revenue */}
          <div className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
            <div className="flex items-center gap-4">
              <FaChartLine className="text-4xl text-green-500" />
              <div>
                <h4 className="text-2xl font-bold">₹ 4300</h4>
                <p className="text-gray-700">Total Revenue</p>
              </div>
            </div>
          </div>

          {/* Total Units Sold */}
          <div className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
            <div className="flex items-center gap-4">
              <FaShoppingCart className="text-4xl text-blue-500" />
              <div>
                <h4 className="text-2xl font-bold">₹ 4300</h4>
                <p className="text-gray-700">Total Units Sold</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Earnings Breakdown */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800">Earnings</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {/* Daily Purchases */}
          <div className="bg-green-500 text-white p-6 rounded-lg flex flex-col items-center">
            <FaRupeeSign className="text-4xl" />
            <h4 className="text-2xl font-bold">₹ 4300</h4>
            <p>Daily Purchases</p>
          </div>

          {/* Weekly Purchases */}
          <div className="bg-orange-500 text-white p-6 rounded-lg flex flex-col items-center">
            <FaBuilding className="text-4xl" />
            <h4 className="text-2xl font-bold">₹ 4300</h4>
            <p>Weekly Purchases</p>
          </div>

          {/* Monthly Purchases */}
          <div className="bg-cyan-500 text-white p-6 rounded-lg flex flex-col items-center">
            <FaChartBar className="text-4xl" />
            <h4 className="text-2xl font-bold">₹ 4300</h4>
            <p>Monthly Purchases</p>
          </div>
        </div>
      </div>
    </div>

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
function DropdownNavItem({ Icon, label, items, activeItem, setActiveItem }) {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    return (
        <div className="relative">
            <div
                className={`flex items-center justify-between cursor-pointer px-4 py-2 rounded-md transition ${activeItem === label ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-100"
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
                <ChevronDown size={18} className={`${open ? "rotate-180" : ""} transition-transform`} />
            </div>
            {open && (
                <div className="mt-2 bg-white shadow-md rounded-md w-full">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="px-4 py-2 text-gray-700 hover:bg-blue-100 cursor-pointer transition"
                            onClick={() => {
                                if (item === "Doctor List") {
                                    router.push("/doctors_list");
                                }
                            }}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

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
