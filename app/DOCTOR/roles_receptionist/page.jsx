"use client";

import { useState, useEffect } from "react";
import { Home, Bell, Phone, User, Users, UserPlus, Settings, Calendar, ChartNoAxesCombined, CreditCard, ChevronDown } from "lucide-react";
import DocSideBar from "../../../components/DocSideBar";

export default function UsersTable() {
    const [activeItem, setActiveItem] = useState(null);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [role, setRole] = useState('receptionist'); // Hardcoded role for now

    useEffect(() => {
        // Fetch users from backend when integrated
        fetch(`/api/staff/fetchStaff?role=${role}`)
            .then((res) => res.json())
            .then((data) => setUsers(data.staffMembers)) // Assuming API responds with staffMembers
            .catch((err) => console.error('Error fetching users:', err));
    }, [role]); // Fetch when role changes

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <DocSideBar />

            {/* Main Content */}
            <div className="flex-1 p-6 ml-64 text-black">
                <header className="flex justify-between items-center bg-blue-600 p-4 rounded-lg shadow-md">
                    <h1 className="text-white text-lg font-bold">Receptionst</h1>
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
                <div className="p-6 bg-gray-100 min-h-screen">
                <div className="bg-white p-6 rounded-lg text-black shadow-md">
                <h1 className="text-2xl text-black font-semibold mb-4">Staff</h1>
                        <div className="flex justify-end mb-4">
                            <input
                                type="text"
                                placeholder="Search"
                                className="border px-3 py-2 rounded-lg shadow-sm w-64"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border p-2">User Name</th>
                                    <th className="border p-2">User Email</th>
                                    <th className="border p-2">Mobile Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users
                                    .filter((user) =>
                                        user.username.toLowerCase().includes(search.toLowerCase())
                                    )
                                    .map((user, index) => (
                                        <tr key={index} className="border">
                                            <td className="border p-2 font-semibold">{user.username}</td>
                                            <td className="border p-2">{user.email}</td>
                                            <td className="border p-2 font-semibold">{user.phone}</td>
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
