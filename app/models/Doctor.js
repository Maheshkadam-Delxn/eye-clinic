// import mongoose from "mongoose";

// const DoctorSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   username :{type: String, required: true, unique: true},
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   phone: { type: String, required: true },
//   isAdmin: { type: Boolean, default: false },
//   role: {type: String,enum: ['receptionist', 'doctor', 'patient']}
// });

// // 🔹 Prevent model overwrite issue in Next.js
// const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", DoctorSchema);

// export default Doctor;
