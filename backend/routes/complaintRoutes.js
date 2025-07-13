import express from "express";
import {
  createComplaint,
  getUserComplaints,
  updateComplaintStatus,
  downloadComplaintReport,
} from "../controllers/complaintControllers.js";
import authMiddleware from "../middleware/authMiddleware.js"; // Middleware to verify user
import { getNotifications } from "../controllers/complaintControllers.js";
import { getTotalComplaints } from "../controllers/complaintControllers.js";

const router = express.Router();

// Create a new complaint
router.post("/create", authMiddleware, createComplaint);

// Get all complaints for logged-in user
router.get("/", authMiddleware, getUserComplaints);

// Update complaint status
router.put("/:id", authMiddleware, updateComplaintStatus);

// Get notifiactions
router.get("/notifications", authMiddleware, getNotifications);

//Total Complaints
router.get("/total", getTotalComplaints);

// Add route for fetching department-wise stats
// router.get("/department-stats", authMiddleware, getComplaintsByDepartment);

// Report download
router.get("/download-report", authMiddleware, downloadComplaintReport);

export default router;
