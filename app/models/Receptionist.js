import mongoose from "mongoose";

const ReceptionistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }, // Can be promoted to Admin
  role : {type : String, default: "receptionist"}
});

// 🔹 Prevent model overwrite issue in Next.js
const Receptionist = mongoose.models.Receptionist || mongoose.model("Receptionist", ReceptionistSchema);

export default Receptionist;
