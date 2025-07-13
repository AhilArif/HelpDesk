// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const UserProfile = () => {
//   const [userDetails, setUserDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         console.log("Token being sent:", token);
//         if (!token) {
//           console.error("No token found in localStorage");
//           navigate("/login");
//           return;
//         }

//         const response = await fetch("http://10.51.70.80:8000/api/user/profile/:id", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = await response.json();
//         if (response.ok && data.success) {
//           setUserDetails(data.user);
//         } else {
//           console.error("Error:", data.message || "Failed to fetch profile");
//         }
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserDetails();
//   }, [navigate]);

  // if (loading) {
  //   return (
  //     <div style={styles.loading}>
  //       <div className="spinner"></div>
  //       <p>Loading your profile...</p>
  //     </div>
  //   );
  // }

//   return (
//     <div style={styles.container}>
//       {/* Back Button */}
//       <button style={styles.backButton} onClick={() => navigate("/user-home")}>
//         ← Back to Dashboard
//       </button>

//       <div style={styles.profileCard}>
//         <h2 style={styles.heading}>User Profile</h2>
//         {userDetails ? (
//           <div style={styles.detailsContainer}>
//             <p>
//               <strong>Name:</strong> {userDetails.name}
//             </p>
//             <p>
//               <strong>Email:</strong> {userDetails.email}
//             </p>
//             <p>
//               <strong>Department:</strong> {userDetails.department}
//             </p>
//             <p>
//               <strong>Designation:</strong> {userDetails.designation}
//             </p>
//             <p>
//               <strong>Role:</strong> {userDetails.role || "User"}
//             </p>
//           </div>
//         ) : (
//           <p style={styles.error}>Unable to fetch user details.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// // CSS-in-JS Styling
// const styles = {
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     minHeight: "100vh",
//     backgroundColor: "#f8f9fa",
//     fontFamily: "Arial, sans-serif",
//     padding: "20px",
//   },
//   profileCard: {
//     width: "400px",
//     padding: "20px",
//     borderRadius: "15px",
//     backgroundColor: "#ffffff",
//     boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//     textAlign: "center",
//   },
//   heading: {
//     fontSize: "24px",
//     color: "#34495e",
//     marginBottom: "20px",
//   },
//   detailsContainer: {
//     textAlign: "left",
//     lineHeight: "1.8",
//     fontSize: "16px",
//     color: "#2c3e50",
//   },
//   backButton: {
//     position: "absolute",
//     top: "20px",
//     left: "20px",
//     padding: "10px 20px",
//     backgroundColor: "#3498db",
//     color: "#ffffff",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//     fontSize: "14px",
//   },
//   error: {
//     color: "#e74c3c",
//   },
//   loading: {
//     textAlign: "center",
//     color: "#7f8c8d",
//     fontSize: "18px",
//   },
// };

// export default UserProfile;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token from localStorage
        if (!token) {
          console.error("No token found in localStorage");
          navigate("/login"); // Redirect to login if no token
          return;
        }

        const response = await fetch("http://10.51.20.77:3000/auth/profile", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok && data.success) {
          setUserDetails(data.user); // Set user details
        } else {
          console.error("Error:", data.message || "Failed to fetch profile");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, [navigate]);

  if (loading) {
    return (
      <div style={styles.loading}>
        <div className="spinner"></div>
        <p>Loading your profile...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Back Button */}
      <button style={styles.backButton} onClick={() => navigate("/user-home")}>
        ← Back to Home
      </button>

      <div style={styles.profileCard}>
        <h2 style={styles.heading}>User Profile</h2>
        {userDetails ? (
          <div style={styles.detailsContainer}>
            <p>
              <strong>Name:</strong> {userDetails.name}
            </p>
            <p>
              <strong>Email:</strong> {userDetails.email}
            </p>
            <p>
              <strong>Department:</strong> {userDetails.department}
            </p>
            <p>
              <strong>Designation:</strong> {userDetails.designation}
            </p>
            <p>
              <strong>Role:</strong> {userDetails.role || "User"}
            </p>
          </div>
        ) : (
          <p style={styles.error}>Unable to fetch user details.</p>
        )}
      </div>
    </div>
  );
};

// CSS-in-JS Styling
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  profileCard: {
    width: "400px",
    padding: "20px",
    borderRadius: "15px",
    backgroundColor: "#ffffff",
    boxShadow: "0px 4px 112px rgba(255, 198, 0)",
    textAlign: "center",
  },
  heading: {
    fontSize: "24px",
    color: "#34495e",
    marginBottom: "20px",
  },
  detailsContainer: {
    textAlign: "left",
    lineHeight: "1.8",
    fontSize: "16px",
    color: "#2c3e50",
  },
  backButton: {
    position: "absolute",
    top: "20px",
    right: "20px",
    //left: "20px",
    padding: "10px 20px",
    backgroundColor: "rgba(255, 198, 0)",
    color: "#000",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
  error: {
    color: "#e74c3c",
  },
  loading: {
    textAlign: "center",
    color: "#7f8c8d",
    fontSize: "18px",
  },
};

export default UserProfile;
