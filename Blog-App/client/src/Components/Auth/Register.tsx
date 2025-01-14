import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsRegistered } = useAuth();
  const navigate = useNavigate();
  const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form behavior

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Success:", data);

      if (data.status === "ok") {
        setIsRegistered(true);
        navigate("/dashboard");
      } else {
        alert("Failed to register. Please try again.");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Failed to register. Please try again.");
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100vh",
          textAlign: "center",
        }}
      >
        <div
          style={{
            background: "#e0e5ec",
            borderRadius: "12px",
            padding: "15px 20px",
            width: "450px",
            height: "400px",
            fontSize: "16px",
            color: "#333",
            border: "none",
            outline: "none",
            boxShadow:
              "8px 8px 15px rgba(0, 0, 0, 0.1), -8px -8px 15px rgba(255, 255, 255, 0.7)",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "-20px",
          }}
        >
          <h1>Join Us</h1>
          <form
            onSubmit={registerUser} // Call the registerUser function on form submission
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <input
              style={{
                width: "300px",
                height: "40px",
                borderRadius: "50px",
                background: "#fff",
                color: "#333",
                border: "none",
                outline: "none",
                boxShadow:
                  " inset 5px 5px 10px #b8bec7, inset -5px -5px 10px #ffffff",
                paddingLeft: "10px",
                marginTop: "10px",
              }}
              type="text"
              name="Username"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              style={{
                width: "300px",
                height: "40px",
                borderRadius: "50px",
                background: "#fff",
                color: "#333",
                border: "none",
                outline: "none",
                boxShadow:
                  " inset 5px 5px 10px #b8bec7, inset -5px -5px 10px #ffffff",
                paddingLeft: "10px",
                marginTop: "20px",
              }}
              type="email"
              name="Email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              style={{
                width: "300px",
                height: "40px",
                borderRadius: "50px",
                background: "#fff",
                color: "#333",
                border: "none",
                outline: "none",
                boxShadow:
                  " inset 5px 5px 10px #b8bec7, inset -5px -5px 10px #ffffff",
                paddingLeft: "10px",
                marginTop: "20px",
              }}
              type="password"
              name="Password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              style={{
                width: "100px",
                height: "30px",
                borderRadius: "2px",
                background: "#333",
                color: "#fff",
                border: "none",
                outline: "none",
                boxShadow:
                  "8px 8px 15px rgba(0, 0, 0, 0.1), -8px -8px 15px rgba(255, 255, 255, 0.7)",
                marginTop: "20px",
                cursor: "pointer",
              }}
              type="submit"
            >
              Register
            </button>
          </form>
          <p style={{ position: "absolute", bottom: "0" }}>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
