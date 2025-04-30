"use client"

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { Home, Bell, Phone, User, Settings, Calendar, Users, CreditCard, ChevronDown } from 'lucide-react';
import DocSideBar from "../../../components/DocSideBar";


export default function PrescriptionComponent() {
  const searchParams = useSearchParams();
  const [activeItem, setActiveItem] = useState(null);
  const [inputValue, setInputValue] = useState('');
  <input
    type="text"
    value={inputValue}
    onChange={(e) => setInputValue(e.target.value)}
  />
  
  const [prescription, setPrescription] = useState({
    patientName: searchParams.get("name") || "",
    age: searchParams.get("age") || "",
    gender: searchParams.get("gender") || "",
    date: searchParams.get("date") || "",
    powerDetails: {
      left: { sph: '', cyl: '', axis: '', pd: '' },
      right: { sph: '', cyl: '', axis: '', pd: '' }
    },
    suggestion: ''
  });

  useEffect(() => {
    setPrescription((prev) => ({
      ...prev,
      patientName: searchParams.get("name") || prev.patientName,
      age: searchParams.get("age") || prev.age,
      gender: searchParams.get("gender") || prev.gender,
      date: searchParams.get("date") || prev.date,
    }));
  }, [searchParams]);

  const handleSubmit = () => {
    const jsonData = JSON.stringify(prescription, null, 2);
    alert(jsonData);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <DocSideBar />

      {/* Main Content */}
      <div className="flex-1 text-black p-6 ml-64">
        {/* Header */}
        <header className="flex justify-between items-center bg-blue-600 p-4 rounded-lg shadow-md">
          <h1 className="text-white text-lg font-bold">Prescription</h1>
          <div className="flex flex-row space-x-4">
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-2 rounded-md focus:ring outline-none"
            />
            <div className="items-center justify-center flex flex-row gap-4">
              <User className="text-white" />
            </div>
          </div>
        </header>

        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-lg font-semibold">Create Prescription</h2>
          <div className="grid grid-cols-3 gap-4">
          <input 
  type="text" 
  placeholder="Enter Name" 
  value={prescription.patientName} 
  onChange={(e) => setPrescription({ ...prescription, patientName: e.target.value })} 
  className="border p-2 rounded" 
/>

<input 
  type="text" 
  placeholder="Enter Age" 
  value={prescription.age} 
  onChange={(e) => setPrescription({ ...prescription, age: e.target.value })} 
  className="border p-2 rounded" 
/>

<input 
  type="text" 
  placeholder="Enter Gender" 
  value={prescription.gender} 
  onChange={(e) => setPrescription({ ...prescription, gender: e.target.value })} 
  className="border p-2 rounded" 
/>

<input 
  type="date" 
  value={prescription.date} 
  onChange={(e) => setPrescription({ ...prescription, date: e.target.value })} 
  className="border p-2 rounded" 
/>

            {/* <input type="text" placeholder="Enter Name" value={prescription.patientName} onChange={(e) => setPrescription({ ...prescription, patientName: e.target.value })} className="border p-2 rounded" />
            <input type="text" placeholder="Enter Age" value={prescription.age} onChange={(e) => setPrescription({ ...prescription, age: e.target.value })} className="border p-2 rounded" />
            <input type="text" placeholder="Enter Gender" value={prescription.gender} onChange={(e) => setPrescription({ ...prescription, gender: e.target.value })} className="border p-2 rounded" />
            <input type="date" value={prescription.date} onChange={(e) => setPrescription({ ...prescription, date: e.target.value })} className="border p-2 rounded" /> */}
            {/* <input type="text" placeholder="Search Medicine" value={prescription.medicine} onChange={(e) => setPrescription({ ...prescription, medicine: e.target.value })} className="border p-2 rounded" />
            
            <input type="text" placeholder="Dosage" value={prescription.dosage} onChange={(e) => setPrescription({ ...prescription, dosage: e.target.value })} className="border p-2 rounded" />
            <input type="text" placeholder="Duration (in days)" value={prescription.duration} onChange={(e) => setPrescription({ ...prescription, duration: e.target.value })} className="border p-2 rounded" /> */}
          </div>

          <div className="mt-6 bg-blue-50 p-4 rounded-lg ">
            <h3 className="text-lg font-semibold">Power Details</h3>
            <div className="grid grid-cols-4 ml-40 space-x-20">
              <div>
                <h4 className="font-bold">LEFT (OS)</h4>
                <label htmlFor="" className='text-sm'>SPH</label>
                <input type="text" placeholder="SPH" value={prescription.powerDetails.left.sph} onChange={(e) => setPrescription({ ...prescription, powerDetails: { ...prescription.powerDetails, left: { ...prescription.powerDetails.left, sph: e.target.value } } })} className="border p-2 rounded mb-1" />
                <label htmlFor="" className='text-sm'>CYL</label>
                <input type="text" placeholder="CYL" value={prescription.powerDetails.left.cyl} onChange={(e) => setPrescription({ ...prescription, powerDetails: { ...prescription.powerDetails, left: { ...prescription.powerDetails.left, cyl: e.target.value } } })} className="border p-2 rounded mb-1" />
                <label htmlFor="" className='text-sm'>AXIS</label>
                <input type="text" placeholder="AXIS" value={prescription.powerDetails.left.axis} onChange={(e) => setPrescription({ ...prescription, powerDetails: { ...prescription.powerDetails, left: { ...prescription.powerDetails.left, axis: e.target.value } } })} className="border p-2 rounded mb-1" />
                <label htmlFor="" className='text-sm'>PD</label>
                <input type="text" placeholder="PD" value={prescription.powerDetails.left.pd} onChange={(e) => setPrescription({ ...prescription, powerDetails: { ...prescription.powerDetails, left: { ...prescription.powerDetails.left, pd: e.target.value } } })} className="border p-2 rounded mb-1" />
              </div>
              <div>
                <h4 className="font-bold   ">RIGHT (OD)</h4>
                <label htmlFor="" className='text-sm'>SPH</label>
                <input type="text" placeholder="SPH" value={prescription.powerDetails.right.sph} onChange={(e) => setPrescription({ ...prescription, powerDetails: { ...prescription.powerDetails, right: { ...prescription.powerDetails.right, sph: e.target.value } } })} className="border p-2 rounded  mb-1" />
                <label htmlFor="" className='text-sm'>CYL</label>
                <input type="text" placeholder="CYL" value={prescription.powerDetails.right.cyl} onChange={(e) => setPrescription({ ...prescription, powerDetails: { ...prescription.powerDetails, right: { ...prescription.powerDetails.right, cyl: e.target.value } } })} className="border p-2 rounded mb-1" />
                <label htmlFor="" className='text-sm'>AXIS</label>
                <input type="text" placeholder="AXIS" value={prescription.powerDetails.right.axis} onChange={(e) => setPrescription({ ...prescription, powerDetails: { ...prescription.powerDetails, right: { ...prescription.powerDetails.right, axis: e.target.value } } })} className="border p-2 rounded mb-1" />
                <label htmlFor="" className='text-sm'>PD</label>
                <input type="text" placeholder="PD" value={prescription.powerDetails.right.pd} onChange={(e) => setPrescription({ ...prescription, powerDetails: { ...prescription.powerDetails, right: { ...prescription.powerDetails.right, pd: e.target.value } } })} className="border p-2 rounded mb-1" />
              </div>
            </div>
            <div>
              <h3 className='font-bold'>Suggestions : </h3>
              <input
                type="text"
                placeholder="Enter Suggestions..."
                value={prescription.suggestion}
                onChange={(e) => setPrescription({ ...prescription, suggestion: e.target.value })}
                className="border p-2 rounded-lg m-2 w-full py-7"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-end">
          <input
            className="h-8 m-4 px-12 text-base text-white bg-blue-500 rounded-lg cursor-pointer focus:shadow-outline hover:bg-blue-800"
            type="button"
            value="Submit"
            onClick={handleSubmit}
          />

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
