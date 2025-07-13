import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminHomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [totalComplaints, setTotalComplaints] = useState(0); // State for total complaints
  const navigate = useNavigate();

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Logout Functionality
  const handleLogout = () => {
    navigate("/"); // Redirect to login page
  };

  // Fetch total complaints
  useEffect(() => {
    const fetchTotalComplaints = async () => {
      try {
        const response = await axios.get("http://10.51.20.77:3000/api/complaint/total", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });      
      setTotalComplaints(response.data.totalComplaints || 0);
      } catch (error) {
        console.error("Error fetching total complaints:", error.response || error.message);
    }    
    };
    fetchTotalComplaints();
  }, []);

  const handleDownloadReport = async () => {
    const month = prompt("Enter month (MM):");  // Simple prompt for now
    const year = prompt("Enter year (YYYY):");
  
    try {
      const response = await axios.get("http://10.51.20.77:3000/api/complaint/download-report", {
        params: { month, year },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        responseType: "blob",  // Important for file download
      });
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `complaints-${month}/${year}.csv`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Failed to download report:", error);
      alert("Failed to download report. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      {/* Header with Hamburger */}
      <div style={styles.header}>
        <button onClick={toggleSidebar} style={styles.hamburger}>
          ☰
        </button>
        <h1 style={styles.title}>Admin Panel</h1>
      </div>

      {/* Sidebar */}
      <div
        style={{
          ...styles.sidebar,
          transform: isSidebarOpen ? "translateX(0)" : "translateX(-250px)",
        }}
      >
        <div style={styles.sidebarHeader}>
          <button onClick={toggleSidebar} style={styles.closeButton}>
            ✖
          </button>
        </div>
        <ul style={styles.menu}>
          <li onClick={() => navigate("/admin-dashboard")} style={styles.menuItem}>
            Admin Dashboard
          </li>
          <li style={styles.menuItem} onClick={() => navigate("/admin-complains")}>
            Complains
          </li>
          <li style={styles.menuItem} onClick={() => navigate("/user-activity")}>
            User Activity
          </li>
          <li onClick={handleLogout} style={styles.menuItem}>
            Logout
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <h2>Welcome to the Admin Panel</h2>
        <p>Select an option from the sidebar to proceed.</p>

        {/* Total Complaints */}
        <div style={styles.totalComplaints}>
          <h3>Total Complaints Received</h3>
          <p style={styles.complaintCount}>{totalComplaints}</p>
        </div>
        <div style={styles.downloadSection}>
          <button onClick={handleDownloadReport} style={styles.downloadButton}>
            Download Monthly Report
          </button>
        </div>
      </div>
    </div>
  );
};

// CSS styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    overflow: "hidden",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#1f184c",
    color: "#fff",
    padding: "10px 20px",
  },
  hamburger: {
    background: "none",
    color: "#fff",
    fontSize: "24px",
    border: "none",
    cursor: "pointer",
  },
  title: {
    margin: 0,
  },
  sidebar: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "250px",
    height: "100%",
    background: "#FFC600",
    boxShadow: "2px 0 5px rgba(0, 0, 0, 0.5)",
    transform: "translateX(-250px)",
    transition: "transform 0.3s ease",
    zIndex: "1000",
  },
  sidebarHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 15px",
    background: "#1f184c",
    color: "#fff",
  },
  closeButton: {
    background: "none",
    color: "#fff",
    fontSize: "20px",
    border: "none",
    cursor: "pointer",
  },
  menu: {
    listStyle: "none",
    padding: "20px",
    margin: "0",
  },
  menuItem: {
    margin: "10px 0",
    padding: "10px",
    cursor: "pointer",
    background: "#1f184c",
    color: "#fff",
    borderRadius: "5px",
    textAlign: "center",
  },
  mainContent: {
    marginTop: "50px",
    padding: "20px",
    flex: "1",
    overflowY: "auto",
  },
  totalComplaints: {
    marginTop: "20px",
    background: "#1f184c",
    color: "#fff",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
  },
  complaintCount: {
    fontSize: "24px",
    fontWeight: "bold",
  },
};

export default AdminHomePage;
