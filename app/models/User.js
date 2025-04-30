import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
  },
  password: { type: String, required: true },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  role:{
    type: String,
    enum: ['receptionist', 'doctor', 'patient'],
    default: 'patient'
  }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;