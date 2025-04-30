"use client";

import { useState, useEffect  } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { Home, Bell, Phone, User, Settings, Calendar, Users, CreditCard, Search, ChevronDown } from "lucide-react";
import DocSideBar from "../../components/DocSideBar";

export default function Dashboard() {
    const [activeItem, setActiveItem] = useState(null);
    const [isActivetext, setIsActivetext] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch("/api/appointments") // Replace with your actual backend API
          .then((res) => res.json())
          .then((data) => setAppointments(data))
          .catch((err) => console.error("Error fetching appointments:", err));
      }, []);
    

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <DocSideBar />

            {/* Main Content */}
            <div className="flex-1 p-6 ml-64 items-center justify-center">
                <header className="flex justify-between items-center bg-blue-600 p-4 rounded-lg shadow-md">
                    <h1 className="text-white text-lg font-bold">Appointment List</h1>
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

                <div className="p-6 bg-gray-100 min-h-screen">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-4">Patient List</h1>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  {/* <th className="border p-2">Id</th> */}
                  <th className="border p-2">Patient Name</th>
                  <th className="border p-2">Mobile Number</th>
                  <th className="border p-2">Gender</th>
                  <th className="border p-2">Age</th>
                  <th className="border p-2">Consulting Doctor Name</th>
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Time</th>
                  <th className="border p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments
                  .filter((appointment) =>
                    appointment.patientName.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((appointment, index) => (
                    <tr key={index} className="border">
                      {/* <td className="border p-2 text-center">{appointment.id}</td> */}
                      <td className="border p-2 font-semibold">{appointment.patientName}</td>
                      <td className="border p-2">{appointment.mobileNumber}</td>
                      <td className="border p-2">{appointment.gender}</td>
                      <td className="border p-2 text-center">{appointment.age}</td>
                      <td className="border p-2 font-semibold">{appointment.doctorName}</td>
                      <td className="border p-2">{appointment.date}</td>
                      <td className="border p-2">{appointment.time}</td>
                      <td
                        className={`border p-2 font-semibold ${
                          appointment.status === "Ongoing"
                            ? "text-green-600"
                            : appointment.status === "Completed"
                            ? "text-blue-600"
                            : "text-orange-500"
                        }`}
                      >
                        {appointment.status}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
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

