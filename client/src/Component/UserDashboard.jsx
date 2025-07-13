import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { io } from "socket.io-client";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [complaints, setComplaints] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Network");
  const [selectedProblem, setSelectedProblem] = useState("");
  const [customProblem, setCustomProblem] = useState("");
  // const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  // Initialize Socket.IO
  const socket = io("http://10.51.20.77:3000", {
    auth: {
      token: localStorage.getItem("token"),
    },
  });

  const problemsByCategory = {
    Network: ["Slow Internet", "Disconnected Wi-Fi", "VPN Issue", "Other"],
    Accessories: ["Mouse Not Working", "Keyboard Malfunction", "Monitor Issue", "Other"],
    PABX: ["Call Dropped", "Extension Issue", "Voicemail Not Working", "Other"],
  };

  // Fetch complaints on component mount
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please log in to view your complaints.");
          return;
        }

        const response = await fetch("http://10.51.20.77:3000/api/complaint/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch complaints");

        const data = await response.json();
        if (data.success) {
          setComplaints(data.complaints);
        } else {
          toast.error("Unable to load complaints.");
        }
      } catch (error) {
        console.error("Error fetching complaints:", error);
        // toast.error("An error occurred. Please try again.");
      }
    };

    fetchComplaints();
  }, []);

  // Real-time notification listener
  // useEffect(() => {
  //   socket.on("notification", (data) => {
  //     setNotifications((prev) => [...prev, data]);
  //     toast.success(`New Notification: ${data.message}`);
  //   });

  //   return () => {
  //     socket.off("notification"); // Clean up the listener
  //   };
  // }, [socket]);

  // const handleTabChange = (tabIndex) => {
  //   setActiveTab(tabIndex);
  // };

  // const handleTicketSubmission = async (e) => {
  //   e.preventDefault();

  //   if (selectedProblem === "Other" && !customProblem) {
  //     toast.error("Please describe your problem in the custom description field.");
  //     return;
  //   }

  //   const problemDescription = selectedProblem === "Other" ? customProblem : selectedProblem;

  //   const newComplaint = {
  //     category: selectedCategory,
  //     problem: problemDescription,
  //   };

  //   try {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       toast.error("No token found. Please login again.");
  //       return;
  //     }

  //     const response = await fetch("http://10.51.70.80:8000/api/complaint/create", {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(newComplaint),
  //     });

  //     const data = await response.json();
  //     if (response.ok && data.success) {
  //       toast.success(`Ticket Submitted! Ticket Number: ${data.ticket}`);
  //       setSelectedProblem("");
  //       setCustomProblem("");
  //     } else {
  //       toast.error(data.error || "Failed to submit ticket. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error submitting ticket:", error);
  //     toast.error("An error occurred while submitting your ticket.");
  //   }
  // };

  const handleTicketSubmission = async (e) => {
    e.preventDefault();

    if (selectedProblem === "Other" && !customProblem) {
        toast.error("Please describe your problem in the custom description field.");
        return;
    }

    const problemDescription = selectedProblem === "Other" ? customProblem : selectedProblem;

    const newComplaint = {
        category: selectedCategory,
        problem: problemDescription,
    };

    try {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("No token found. Please login again.");
            return;
        }

        const response = await fetch("http://10.51.20.77:3000/api/complaint/create", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newComplaint),
        });

        const data = await response.json();
        if (response.ok && data.success) {
            toast.success(`Complaint Submitted Successfully! Ticket Number: ${data.ticket}`);
            setSelectedProblem("");
            setCustomProblem("");
        } else {
            toast.error(data.error || "Failed to submit complaint. Please try again.");
        }
    } catch (error) {
        console.error("Error submitting complaint:", error);
        toast.error("An error occurred while submitting your complaint.");
    }
};


  return (
    <div style={styles.container}>
      <Toaster />
      <div style={styles.header}>
        <h2>Complaint Dashboard</h2>
        <button style={styles.backButton} onClick={() => navigate("/user-home")}>
          ← Back to Home
        </button>
      </div>

      <div style={styles.tabs}>
        <button
          style={activeTab === 1 ? styles.activeTab : styles.tab}
          onClick={() => handleTabChange(1)}
        >
          Create New Ticket
        </button>
        {/* <button
          style={activeTab === 4 ? styles.activeTab : styles.tab}
          onClick={() => handleTabChange(4)}
        >
          Notifications
        </button> */}
      </div>

      <div style={styles.content}>
        {activeTab === 1 && (
          <CreateNewTicket
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedProblem={selectedProblem}
            setSelectedProblem={setSelectedProblem}
            customProblem={customProblem}
            setCustomProblem={setCustomProblem}
            problemsByCategory={problemsByCategory}
            handleTicketSubmission={handleTicketSubmission}
          />
        )}
        {/* {activeTab === 4 && <Notifications notifications={notifications} />} */}
      </div>
    </div>
  );
};

const CreateNewTicket = ({
  selectedCategory,
  setSelectedCategory,
  selectedProblem,
  setSelectedProblem,
  customProblem,
  setCustomProblem,
  problemsByCategory,
  handleTicketSubmission,
}) => {
  return (
    <div>
      <h3>Create New Ticket</h3>
      <form onSubmit={handleTicketSubmission}>
        <div style={styles.formGroup}>
          <label>Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={styles.input}
          >
            {Object.keys(problemsByCategory).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div style={styles.formGroup}>
          <label>Problem:</label>
          <select
            value={selectedProblem}
            onChange={(e) => setSelectedProblem(e.target.value)}
            style={styles.input}
            required
          >
            <option value="">Select Problem</option>
            {problemsByCategory[selectedCategory].map((problem, index) => (
              <option key={index} value={problem}>
                {problem}
              </option>
            ))}
          </select>
        </div>
        {selectedProblem === "Other" && (
          <div style={styles.formGroup}>
            <label>Describe Your Problem:</label>
            <textarea
              value={customProblem}
              onChange={(e) => setCustomProblem(e.target.value)}
              style={styles.textarea}
              placeholder="Enter your problem description"
              required
            />
          </div>
        )}
        <button type="submit" style={styles.button}>
          Submit Complaint
        </button>
      </form>
    </div>
  );
};

const Notifications = ({ notifications }) => (
  <div>
    <h3>Notifications</h3>
    <ul>
      {notifications.map((notif, index) => (
        <li key={index}>
          {notif.message} - {new Date(notif.timestamp || Date.now()).toLocaleString()}
        </li>
      ))}
    </ul>
  </div>
);

const styles = {
  container: { margin: "10px" },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  tabs: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "20px",
  },
  tab: {
    padding: "10px 20px",
    cursor: "pointer",
    background: "#f0f0f0",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  activeTab: {
    padding: "10px 20px",
    cursor: "pointer",
    background: "rgba(255, 198, 0)",
    color: "#000",
    border: "1px rgba(255, 198, 0)",
    borderRadius: "5px",
  },
  content: {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  formGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    minHeight: "100px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    background: "rgba(255, 198, 0)",
    color: "#000",
    border: "none",
    borderRadius: "5px",
  },
};

export default UserDashboard;
