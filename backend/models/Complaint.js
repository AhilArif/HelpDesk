// import mongoose from "mongoose";

// const complaintSchema = new mongoose.Schema({
//   category: { type: String, required: true },
//   problem: { type: String, required: true },
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Linking to User model
//   status: { type: String, default: "Pending" }, // Status of the complaint (e.g., Pending, Resolved)
//   createdAt: { type: Date, default: Date.now }, // Timestamp for creation
// });

// export default mongoose.model("Complaint", complaintSchema);

import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  category: { type: String, required: true },
  problem: { type: String, required: true },
  status: { type: String, default: "Unresolved" },
  ticketNumber: { type: String, required: true, unique: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });


export default mongoose.model("Complaint", complaintSchema);

