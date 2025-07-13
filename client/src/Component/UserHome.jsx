import React from "react";
import { useNavigate } from "react-router-dom";

const UserHome = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to User Home!</h1>
      <p style={styles.subtitle}>Click on the buttons below to navigate:</p>

      <div style={styles.buttonContainer}>
        {/* Buttons with hover effect */}
        <div
          className="svg-wrapper"
          onClick={() => navigate("/user-dashboard")}
        >
          <svg height="60" width="320" xmlns="http://www.w3.org/2000/svg">
            <rect className="shape" height="60" width="320" />
          </svg>
          <div className="text">Register Complaint</div>
        </div>

        <div
          className="svg-wrapper"
          onClick={() => navigate("/user-profile")}
        >
          <svg height="60" width="320" xmlns="http://www.w3.org/2000/svg">
            <rect className="shape" height="60" width="320" />
          </svg>
          <div className="text">Profile</div>
        </div>

        <div
          className="svg-wrapper"
          onClick={() => window.open("http://180.149.216.250:2024/", "_blank")}
        >
          <svg height="60" width="320" xmlns="http://www.w3.org/2000/svg">
            <rect className="shape" height="60" width="320" />
          </svg>
          <div className="text">Attendance</div>
        </div>

        <div className="svg-wrapper" onClick={() => navigate("/")}>
          <svg height="60" width="320" xmlns="http://www.w3.org/2000/svg">
            <rect className="shape" height="60" width="320" />
          </svg>
          <div className="text">Logout</div>
        </div>
      </div>
    </div>
  );
};

// Inline styles for layout
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#1f184c",
    padding: "20px",
  },
  title: {
    fontSize: "36px",
    color: "rgba(255, 198, 0)",
    marginBottom: "15px",
    textAlign: "center",
  },
  subtitle: {
    fontSize: "20px",
    color: "white",
    marginBottom: "40px",
    textAlign: "center",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    alignItems: "center",
  },
};

export default UserHome;
