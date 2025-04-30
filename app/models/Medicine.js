import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Unique medicine name
  dosage: { type: String, required: true }, // Example: "500mg"
  instructions: { type: String, required: true }, // Example: "Take after food"
  stock: { type: Number, required: true, default: 0 }, // Total stock available
  restockThreshold: { type: Number, required: true, default: 10 }, // Alert when stock is low
}, { timestamps: true });

const Medicine = mongoose.models.Medicine || mongoose.model("Medicine", medicineSchema);
export default Medicine;
 