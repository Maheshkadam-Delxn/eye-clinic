const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  patientPhone: { type: String, required: true },
  patientEmail: { type: String },
  age: { type: Number, required: true },
  // gender: { type: String, required: true },
  gender: { type: String, required: true, enum: ["Male", "Female", "Other"] },
  appointmentDate: { type: String, required: true }, // Store date separately (YYYY-MM-DD)
  appointmentTime: { type: String, required: true }, // Store time separately (HH:mm)
  reason: { type: String, required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
});

const Appointment = mongoose.models.Appointment || mongoose.model("Appointment", AppointmentSchema);
module.exports = Appointment;



// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const appointmentSchema = new Schema({
//   patientName: {
//     type: String,
//     required: true
//   },
//   patientPhone: {
//     type: String,
//     required: true,
//     index: true
//   },
//   patientEmail: {
//     type: String,
//     index: true
//   },
//   gender: {
//     type: String,
//     enum: ["male", "female", "other"],
//     required: true
//   },
//   age: {
//     type: Number,
//     required: true
//   },
//   appointmentDateTime: {
//     type: Date,
//     required: true
//   },
//   doctor: {
//     type: Schema.Types.ObjectId,
//     ref: 'Doctor',
//     // required: true
//   },
//   reason: String,
//   status: {
//     type: String,
//     enum: ['pending', 'ongoing', 'cancelled', 'completed'],
//     default: 'pending'
//   },
//   prescription: {
//     type: Schema.Types.ObjectId,
//     ref: 'Prescription'
//   }
// }, { timestamps: true });


// const Appointment = mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema);
// export default Appointment;

