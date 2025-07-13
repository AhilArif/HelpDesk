import Complaint from "../models/Complaint.js";
import Notification from "../models/Notification.js";
import Counter from "../models/Counter.js";
import { io } from "../server.js";
import { mailer } from "../routes/auth.js";
import { Parser } from "json2csv";  // CSV Generator

const formatTicketNumber = (number) => {
  return `TCK-${String(number).padStart(5, '0')}`;
};

// Create a new complaint
export const createComplaint = async (req, res) => {
    const { category, problem } = req.body;
    const userEmail = req.user.email; // Assuming the user's email is available in the `req.user`.

    try {
      // Find or initialize the counter
      let counter = await Counter.findOne({ name: "complaintCounter" });
      if (!counter) {
        counter = new Counter({ name: "complaintCounter", value: 0 });
      }
  
      // Increment the counter
      counter.value += 1;
      await counter.save();
  
      // Generate ticket number
      const ticket = formatTicketNumber(counter.value);
  
      // Save the complaint
      const newComplaint = new Complaint({
        user: req.user.id,
        category,
        problem,
        status: "Unresolved",
        ticketNumber: ticket,
      });
  
      const savedComplaint = await newComplaint.save();
  
      // Send email to the user
      await mailer(userEmail, ticket);
  
      res.status(201).json({
        success: true,
        message: "Complaint created successfully.",
        ticket,
      });
    } catch (error) {
      console.error("Error creating complaint:", error);
      res.status(500).json({ success: false, error: "Internal server error." });
    }
  };



// Get complaints for a user
export const getUserComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.status(200).json({ success: true, complaints });
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Update complaint status (admin or user resolving their own complaints)
export const updateComplaintStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
      const complaint = await Complaint.findByIdAndUpdate(
          id,
          { status },
          { new: true }
      );

      if (!complaint) {
          return res.status(404).json({ error: "Complaint not found." });
      }

      // Notify the user in real-time
      io.emit("notification", {
          userId: complaint.user, // The user who owns the complaint
          message: `Your complaint #${complaint._id} status was updated to: ${status}`,
      });

      res.status(200).json({ success: true, complaint });
  } catch (error) {
      console.error("Error updating complaint:", error);
      res.status(500).json({ error: "Internal server error." });
  }
};

// Example function to send notifications
export const sendNotificationToUser = (userId, message) => {
  // Logic for notification (e.g., saving to a notifications collection or real-time update)
  console.log(`Notified user ${userId}: ${message}`);
};

export const getNotifications = async (req, res) => {
  try {
      const notifications = await Notification.find({ user: req.user._id });
      res.status(200).json({ success: true, notifications });
  } catch (error) {
      console.error("Error fetching notifications:", error);
      res.status(500).json({ success: false, error: "Failed to fetch notifications." });
  }
};
// // Status for chart
// export const getComplaintStatus = async (req, res) => {
//   try {
//       const department = req.user.department; // Assuming user has a department field
//       const resolved = await Complaint.countDocuments({ department, status: "Resolved" });
//       const unresolved = await Complaint.countDocuments({ department, status: "Unresolved" });

//       res.status(200).json({ resolved, unresolved });
//   } catch (error) {
//       console.error("Error fetching complaint status:", error);
//       res.status(500).json({ error: "An error occurred while fetching complaint status." });
//   }
// };

//Total Complaints
export const getTotalComplaints = async (req, res) => {
  try {
      const totalComplaints = await Complaint.countDocuments(); // Counts all complaints
      res.status(200).json({ totalComplaints });
  } catch (error) {
      console.error("Error fetching total complaints:", error);
      res.status(500).json({ error: "An error occurred while fetching total complaints." });
  }
};

// Get complaints by department
// export const getComplaintsByDepartment = async (req, res) => {
//   try {
//     const departmentStats = await Complaint.aggregate([
//       {
//         $group: {
//           _id: "$department",  // Group by department field
//           count: { $sum: 1 },  // Count complaints in each department
//         },
//       },
//       {
//         $project: {
//           department: "$_id",
//           count: 1,
//           _id: 0,
//         },
//       },
//     ]);

//     res.status(200).json(departmentStats);
//   } catch (error) {
//     console.error("Error fetching department stats:", error);
//     res.status(500).json({ error: "Failed to fetch complaints by department." });
//   }
// };

export const downloadComplaintReport = async (req, res) => {
  const { month, year } = req.query;  // Get month & year from query params

  try {
    const query = {};
    
    if (month && year) {
      const startDate = new Date(`${year}-${month}-01`);
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1);  // End of the selected month

      query.createdAt = {
        $gte: startDate,
        $lt: endDate,
      };
    }

    const complaints = await Complaint.find(query)
      .populate("user", "name email")  // Get user info
      .select("category problem status createdAt");  // Select fields to export

    if (!complaints.length) {
      return res.status(404).json({ error: "No complaints found for the selected period." });
    }

    const fields = ["category", "problem", "status", "createdAt", "user.name", "user.email"];
    const parser = new Parser({ fields });
    const csv = parser.parse(complaints);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename=complaint-report-${month}-${year}.csv`);
    res.status(200).send(csv);
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ error: "Failed to generate report." });
  }
};


