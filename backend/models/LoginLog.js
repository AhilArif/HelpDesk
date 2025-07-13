import mongoose from 'mongoose';

const loginLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  email: { type: String, required: true },
  ipAddress: { type: String, default: "N/A" },
  userAgent: { type: String, default: "Unknown" },
  createdAt: { type: Date, default: Date.now },
});

export default  mongoose.model("LoginLog", loginLogSchema);
