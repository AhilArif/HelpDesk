import React from "react";
import { useNavigate } from "react-router-dom";
import notFoundGif from "/404.gif";  // Import from src/assets

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <img 
        src={notFoundGif} 
        alt="404 Not Found"
        style={styles.image}
      />
      <h1>Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <button onClick={() => navigate("/")}>Go to Login</button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  image: {
    width: "400px",
    padding: "20px",
    height: "auto",
  },
};

export default NotFound;
