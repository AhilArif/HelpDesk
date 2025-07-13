import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch("http://10.51.20.77:3000/api/complaint/", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (!response.ok) throw new Error("Failed to fetch complaints");

        const data = await response.json();
        if (data.success) setComplaints(data.complaints);
      } catch (error) {
        console.error("Error fetching complaints:", error);
        toast.error("Unable to load complaints. Please try again.");
      }
    };

    fetchComplaints();
  }, []);

  // Function to randomly assign to "Rana Asif" or "Ahil Arif"
  const getRandomAssignee = () => {
    const assignees = ["Rana Asif", "Ahil Arif"];
    return assignees[Math.floor(Math.random() * assignees.length)];
  };

  // Function to handle status update
  const updateComplaintStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://10.51.20.77:3000/api/complaint/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update complaint");

      // Update state
      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint._id === id ? { ...complaint, status: newStatus,
           } : complaint
        )
      );

      toast.success(`Complaint marked as ${newStatus}`);
    } catch (error) {
      console.error("Error updating complaint:", error);
      toast.error("Failed to update complaint. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <Toaster />
      <button onClick={() => navigate("/admin-home")} style={styles.backButton}>
        ← Back to Dashboard
      </button>
      <h2 style={styles.heading}>Admin Complaints Box</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Ticket</th>
            {/* <th style={styles.th}>User</th> */}
            <th style={styles.th}>Category</th>
            <th style={styles.th}>Problem</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Assigned To</th>
            <th style={styles.th}>Received at</th>
            <th style={styles.th}>Resolved at</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint._id} style={styles.tr}>
              <td style={styles.td}>{complaint.ticketNumber || "N/A"}</td>
              {/* <td style={styles.td}>{complaint.user?.name || "N/A"}</td> */}
              <td style={styles.td}>{complaint.category}</td>
              <td style={styles.td}>{complaint.problem}</td>
              <td style={styles.td}>{complaint.status || "Pending"}</td>
              <td style={styles.td}>{getRandomAssignee()}</td>
              <td style={styles.td}>
                 {new Date(complaint.createdAt).toLocaleString("en-PK", {
                  timeZone: "Asia/Karachi",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  //second: "2-digit",
                  })}
              </td>
              <td style={styles.td}>
                {new Date(complaint.updatedAt).toLocaleString("en-PK", {
                  timeZone: "Asia/Karachi",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  //second: "2-digit",
                  })}</td>
              <td style={styles.td}>
                <button
                  style={styles.actionButton}
                  onClick={() => updateComplaintStatus(complaint._id, "Resolved")}
                >
                  ✅
                </button>
                <button
                  style={styles.actionButton}
                  onClick={() => updateComplaintStatus(complaint._id, "Not Resolved")}
                >
                  ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f4f9",
    minHeight: "100vh",
  },
  backButton: {
    padding: "10px 15px",
    marginBottom: "20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
  },
  th: {
    border: "1px solid #ddd",
    padding: "12px",
    backgroundColor: "#007bff",
    color: "white",
    textAlign: "left",
    fontWeight: "bold",
  },
  tr: {
    borderBottom: "1px solid #ddd",
  },
  td: {
    border: "1px solid #ddd",
    padding: "10px",
    textAlign: "left",
  },
  actionButton: {
    backgroundColor: "transparent",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    margin: "0 5px",
  },
};

export default AdminComplaints;
