import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import background from "../assets/background.png"; // Import the background image

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);  // 1 = Login, 2 = Verify Code
  const [isFlipped, setIsFlipped] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const navigate = useNavigate();

  const handleFlip = () => {
    setIsFlipped(true);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === "admin" && password === "admin123") {
      setError("");
      navigate("/admin-home");
      return;
    } else if (email === "user" && password === "user123") {
      setError("");
      navigate("/user-home");
      return;
    }

    try {
      const response = await fetch("http://10.51.20.77:3000/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Invalid credentials");
      }
  
      setTimeout(() => {
        setStep(2);  // Move to verification after login
        setIsFlipped(true);  // Flip the card to show the verification step
      }, 500);
    } catch (error) {
      setError(error.message);
    }
  };
  
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://10.51.20.77:3000/auth/verifycode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),  // Use username as email
          code: verificationCode.trim(),  // Trim verification code
        }),
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Verification failed");
      }
  
      const data = await response.json();
      localStorage.setItem("token", data.token);
      navigate("/user-home", { state: { user: data } });
    } catch (error) {
      setError(error.message);
    }
  };

  

 return (
    <div style={styles.container}>
      <div
        className={`card ${isFlipped ? "flipped" : ""} ${step === 2 ? "slide" : ""}`}
        onClick={handleFlip}
      >
        <div className="card-inner">
          <div className="card-front">
            <img src={background} alt="Logo" style={styles.logo} />
          </div>

          <div className="card-back">
            {step === 1 ? (
              <form style={styles.form} onSubmit={handleLogin}>
                <h2>Login</h2>
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button>Login</button>
              </form>
            ) : (
              <form style={styles.form} onSubmit={handleVerifyCode}>
                <h2>Enter Verification Code</h2>
                <input
                  type="text"
                  placeholder="Verification Code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
                <button>Verify</button>
              </form>
            )}
            {error && <p className="error">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1f184c",
  },
  logo: {
    width: "400px",
    height: "400px",
  },
  form: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default Login;
