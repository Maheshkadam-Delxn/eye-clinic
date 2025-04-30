import React, { useState } from 'react';
import './ConfirmationPopup.css'; // Import your CSS file

function ConfirmationPopup({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="checkmark-container">
          <div className="checkmark"></div>
        </div>
        <h2>Appointment Booked Successfully</h2>
        <p>Patient Name: Shanaya Kapoor</p>
        <p>Time: 11:00 AM</p>
        <p>Date: 16/01/2023</p>
        
        <button className="bg-blue-600 text-white mt-3 px-2 rounded-lg" onClick={onClose}>Done</button> 
      </div>
    </div>
  );
}

export default ConfirmationPopup;