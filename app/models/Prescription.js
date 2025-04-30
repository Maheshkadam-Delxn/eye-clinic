// const prescriptionSchema = new Schema({
//     appointment: {
//       type: Schema.Types.ObjectId,
//       ref: 'Appointment',
//       required: true
//     },
//     doctor: {
//       type: Schema.Types.ObjectId,
//       ref: 'Doctor',
//       required: true
//     },
//     diagnosis: {
//       type: String,
//       required: true
//     },
//     medicines: [{
//       name: String,
//       dosage: String,
//       instructions: String
//     }],
//     notes: String,
//     prescribedDate: {
//       type: Date,
//       default: Date.now
//     },
//     filledDate: Date
//   }, { timestamps: true });


//   const Prescription = mongoose.models.Prescription || mongoose.model("Prescription", prescriptionSchema);
//   export default Prescription;



import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },

  medications: [
    {
      name: String, // Medication name
      dosage: String, // e.g., "1 drop 3 times a day"
      duration: String, // e.g., "7 days"
    },
  ],

  spectacles : {
    rightEye: {
      sph: String,
      cyl: String,
      axis: String,
      // add: String,
      PD: String,
    },
    leftEye: {
      sph: String,
      cyl: String,
      axis: String,
      // add: String,
      PD: String,
    },
  },
  additionalAdvice: String, // e.g., "Reduce screen time, use blue-light filters"
  followUpDate: { type: Date }, // Suggested follow-up appointment

  status: { type: String, enum: ["pending", "paid"], default: "pending" }, // ✅ Track payment
  processedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" }, // ✅ Receptionist who processed payment
}, { timestamps: true });

const Prescription = mongoose.models.Prescription || mongoose.model("Prescription", prescriptionSchema);
export default Prescription;
