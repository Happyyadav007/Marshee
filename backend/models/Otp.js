import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  phone: { type: String },
  email: { type:String },
  name: { type:String },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
}, { timestamps: true });

export default mongoose.model("Otp", otpSchema);
