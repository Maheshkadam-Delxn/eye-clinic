'use client';

import { useState } from 'react';
import { Home, Bell, Phone, User, Settings, UserPlus, Calendar, Users, ChartNoAxesCombined, CreditCard, ChevronDown } from 'lucide-react';
import DocSideBar from '../../../components/DocSideBar';

export default function DoctorsList() {
    const [activeItem, setActiveItem] = useState(null);

    const doctors = [
        {
            name: "Dr. Roshini Patel",
            specialty: "Ophthalmologist",
            experience: "18+ Years of Experience",
            image: "/images/doc1.png",
            profileLink: "/DOCTOR/doc_profile_1"
        },
        {
            name: "Dr. Anand Nair",
            specialty: "Ophthalmologist",
            experience: "22+ Years of Experience",
            image: "/images/doc2.png",
            profileLink: "/DOCTOR/doc_profile_2"
        }
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <DocSideBar />


            {/* Main Content */}
            <div className="flex-1 p-6 ml-64">
                <header className="flex justify-between items-center bg-blue-600 p-4 rounded-lg shadow-md">
                    <h1 className="text-white text-lg font-bold">Doctors List</h1>
                    <div className="flex space-x-4">
                        <input
                            type="text"
                            placeholder="Search"
                            className="px-4 py-2 rounded-md focus:ring outline-none"
                        />
                        
                        <User className="text-white" />
                    </div>
                </header>

                {/* Doctors List Section */}
                <section className="mt-6">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-gray-900 text-xl font-semibold text-center">Doctors</h2>
                        <div className={`grid gap-8 justify-center pt-5
                    ${doctors.length === 1 ? "grid-cols-1 place-items-center" : ""}
                    ${doctors.length === 2 ? "grid-cols-2 place-items-center" : ""}
                    ${doctors.length >= 3 ? "grid-cols-3" : ""}
                `}>
                            {doctors.map((doctor, index) => (
                                <DoctorCard key={index} {...doctor} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* <div className="flex justify-center space-x-40 pt-5"> 
                    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center w-64"> 
                        <img src="/images/doc1.png" alt="Doctor" className="rounded-full" />
                        <h3 className="text-gray-900 text-xl font-bold mt-4">Dr. Roshini Patel</h3>
                        <p className="text-gray-600">Ophthalmologist</p>
                        <p className="text-gray-600">18+ Years of Experience</p>
                        <a href="/doc_profile_1">
                            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">View Profile</button>
                        </a>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center w-64"> 
                        <img src="/images/doc2.png" alt="Doctor" className="rounded-full" />
                        <h3 className="text-gray-900 text-xl font-bold mt-4">Dr. Anand Nair</h3>
                        <p className="text-gray-600">Ophthalmologist</p>
                        <p className="text-gray-600">22+ Years of Experience</p>
                        <a href="/doc_profile_2">
                            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">View Profile</button>
                        </a>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

function DoctorCard({ name, specialty, experience, image, profileLink }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center w-64">
            <img src={image} alt="Doctor" className="w-24 h-24 rounded-full" />
            <h3 className="text-gray-900 text-xl font-bold mt-4">{name}</h3>
            <p className="text-gray-600">{specialty}</p>
            <p className="text-gray-600">{experience}</p>
            <a href={profileLink}>
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">View Profile</button>
            </a>
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
