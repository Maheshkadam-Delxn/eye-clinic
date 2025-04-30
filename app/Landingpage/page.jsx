"use client";

import { PhoneCall, Clock, MapPin, Search ,Mail, Phone } from "lucide-react";

import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import Image from "next/image";


export default function LandingPage() {
    return (
        <div className="w-full">
            {/* Header */}
            <header className="bg-blue-100 text-gray-800 py-3 px-10 flex justify-end items-end border-b">
                <div className="flex space-x-16 text-sm">
                    <div className="flex items-center space-x-2">
                        <PhoneCall className="w-4 h-4 text-blue-600" />
                        <span className="font-semibold">Emergency</span>
                        <span className="text-gray-500">9990 888 1000</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="font-semibold">Working Time</span>
                        <span className="text-gray-500">09:00 - 20:00 Everyday</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span className="font-semibold">Location</span>
                        <span className="text-gray-500">Narhe, Pune, 411 046</span>
                    </div>
                </div>
            </header>

            {/* Navbar */}
            <nav className="flex justify-between items-center px-10 py-4 bg-white shadow-md">
                <h1 className="text-4xl font-bold text-blue-600">Eye Care Clinic</h1>
                <ul className="flex space-x-8 text-gray-700 font-medium">
                    <li className="hover:text-blue-600 font-semibold cursor-pointer">Home</li>
                    <li className="hover:text-blue-600 font-semibold cursor-pointer">About Us</li>
                    <li className="hover:text-blue-600 font-semibold cursor-pointer">Doctors</li>
                    <li className="hover:text-blue-600 font-semibold cursor-pointer">Services</li>
                    <li className="hover:text-blue-600 font-semibold cursor-pointer">Contacts</li>
                </ul>
                <div className="flex space-x-4 items-center ">
                    {/* <Search className="w-5 h-5 text-gray-500 cursor-pointer " /> */}
                    <a href="/login">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600">
                            Login
                        </button>
                    </a>
                </div>
            </nav>

            {/* Hero Section */}
            <section
                className="relative w-full h-[500px] flex items-center px-10 text-white"
                style={{
                    backgroundImage: "url('/images/Background.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="w-1/2">
                    <p className="text-lg font-semibold" style={{ color: 'rgba(71, 56, 136, 1)' }} >Caring for Your Vision</p>
                    <h1 className="text-4xl font-bold text-blue-800 leading-tight mt-2" >
                        Your Vision, Our Mission – Expert Eye Care for a Brighter Tomorrow
                    </h1>
                    <button className="mt-6 bg-cyan-400 text-white px-6 py-3 rounded-lg text-lg shadow-md hover:bg-cyan-500">
                        Book An Appointment
                    </button>
                </div>
            </section>

            <section className="text-center py-16 px-6 bg-white">
                {/* Welcome Text */}
                <h3 className="text-gray-500 text-lg">Welcome to Eye Care Clinic</h3>

                {/* Main Heading */}
                <h2 className="text-3xl font-bold text-indigo-900 mt-2">
                    A Great Place for Vision Care
                </h2>

                {/* Description */}
                <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                    Eye health is essential for a bright and clear future. For generations,
                    advancements in eye care have helped people see the world more clearly,
                    enhancing their quality of life. From ancient remedies to modern innovations,
                    vision care has evolved to provide precise treatments and personalized solutions.
                </p>

                {/* Learn More Button */}
                <a
                    href="#"
                    className="mt-6 inline-block text-blue-600 font-semibold text-lg hover:underline"
                >
                    Learn More ➤
                </a>

                {/* Image Section */}
                <div className="mt-12">
                    <Image
                        src="/images/eye-care-banner.png"
                        alt="Eye Care"
                        width={1920}
                        height={1080}
                        className="w-full object-cover rounded-lg shadow-md"
                    />
                </div>
            </section>

            {/* Services Section */}

            <section className=" px-6 bg-white ">
                {/* Heading */}
                <h2 className="text-3xl bg-white font-bold text-center text-gray-900">Our Services</h2>

                <div className="mt-10 ml-10 mr-10 flex flex-col lg:flex-row items-center lg:items-start lg:justify-between">
                    {/* Left Side - Service List */}
                    <div className="flex flex-col space-y-4 ">
                        {[
                            "Prescription Glasses & Contact Lenses",
                            "Routine Check-up & Eye Exams",
                            "Glaucoma Screening & Management",
                            "Dry Eye Treatment & Others",
                        ].map((service, index) => (
                            <div
                                key={index}
                                className="bg-cyan-400 text-center text-lg font-semibold text-gray-900 py-4 px-6 rounded-lg shadow-md w-48 h-28"
                            >
                                {service}
                            </div>
                        ))}
                    </div>

                    {/* Middle - Description */}
                    <div className="max-w-2xl text-gray-700 text-center lg:text-left mt-10 lg:mt-0">
                        <h3 className="text-xl font-semibold text-gray-900 flex justify-center items-center">
                            A Passion for Clear Vision & Healthy Eyes
                        </h3>

                        <div className="mt-4 ml-14 flex flex-col sm:flex-row sm:justify-between">
                            <ul className="space-y-2 text-gray-700 text-base">
                                <li>✔ Personalized Eye Care</li>
                                <li>✔ Advanced Diagnostics & Treatment</li>
                                <li>✔ A Legacy of Excellence in Vision Health</li>
                            </ul>
                            <ul className="space-y-2 text-gray-700 text-base mt-4 mr-8 sm:mt-0">
                                <li>✔ 5-Star Patient Care</li>
                                <li>✔ Your Vision, Our Mission</li>
                                <li>✔ Always Here for Your Eye Health</li>
                            </ul>
                        </div>

                        <p className="mt-6 text-gray-600 text-lg text-center p-5">
                            Eye care is essential for a lifetime of clear and healthy vision.
                            Over the years, advancements in ophthalmology have transformed the
                            way we diagnose, treat, and prevent eye conditions. From ancient
                            herbal remedies to cutting-edge laser treatments, vision care has
                            always been a blend of science and compassion.
                        </p>

                        <p className="mt-4 text-gray-600 text-lg text-center">
                            At <strong>[Your Eye Clinic Name]</strong>, we specialize in
                            providing the highest quality care, ensuring that every patient
                            receives personalized treatment for their unique vision needs.
                        </p>
                    </div>

                    {/* Right Side - Images */}
                    <div className="mt-10 lg:mt-0 flex flex-col space-y-4">
                        {["eye1.png", "eye2.png", "eye3.png", "eye4.png"].map((img, index) => (
                            <Image
                                key={index}
                                src={`/images/${img}`}
                                alt="Eye Care"
                                width={1080}
                                height={1080}
                                className="w-48 h-28 object-cover rounded-lg shadow-md"
                            />
                        ))}
                    </div>
                </div>
            </section>


            <footer className= " mt-8 bg-[#D9F8FC] text-black p-8 border-t-1">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
        {/* Clinic Info */}
        <div>
          <h2 className="text-xl font-bold text-blue-700">Eye Care Clinic</h2>
          <p className="mt-2 text-sm">Your Vision, Our Mission – Expert Eye Care for a Brighter Tomorrow</p>
        </div>

        {/* Important Links */}
        <div>
          <h3 className="text-lg font-semibold">Important Links</h3>
          <ul className="mt-2 space-y-3">
            <li>Doctors</li>
            <li>Contact us</li>
            <li>Services</li>
            <li>Appointments</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold">Contact Us</h3>
          <p className="flex items-center justify-center md:justify-start gap-2 mt-2">
            <Phone size={16} /> Call: 998877665
          </p>
          <p className="flex items-center justify-center md:justify-start gap-2 mt-2">
            <Mail size={16} /> Email: infoeyecare@clinic.in
          </p>
          <p className="flex items-center justify-center md:justify-start gap-2 mt-2">
            <MapPin size={16} /> Address: Khandewadi Narhe, Pune - 411 046
          </p>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-start gap-4 mt-4">
            <FaXTwitter className="text-black text-2xl cursor-pointer" /> 
            <FaFacebook className="text-black text-2xl cursor-pointer" />
            <FaInstagram className="text-black text-2xl cursor-pointer" /> 
            <FaLinkedin className="text-black text-2xl cursor-pointer" />
            <FaYoutube className="text-black text-2xl cursor-pointer" />
          </div>
        </div>

        {/* Our Services */}
        <div>
          <h3 className="text-lg font-semibold">Our Services</h3>
          <ul className="mt-2 space-y-1">
            <li>Dry Eye Treatment</li>
            <li>Prescription Glasses & Contact Lenses</li>
            <li>Glaucoma Screening & Management</li>
            <li>Routine Eye Exams</li>
          </ul>
        </div>
      </div>
    </footer>

        </div>
    );
}
