import { Schema, models, model } from "mongoose";

const staffSchema = new Schema({
  role: { type: String, enum: ["doctor", "receptionist", "eyewear_employee"], required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, unique: true, sparse: true },
  password: { type: String, required: true },
  phone: { type: String },
  isAdmin :{ type: Boolean, default: false },
  fullName: { type: String },
  age: { type: Number },
  gender: { type: String, enum: ["Male", "Female", "Other"] }, // Doctor who created this staff
}, { timestamps: true });

const Staff = models.Staff || model("Staff", staffSchema);
export default Staff;
