import React, { useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline, MdPassword } from "react-icons/md";
import { Link, Navigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // Consistent camelCase for state variables
  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, role },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setIsAuthorized(true);
    } catch (error) {
      // Check if error response exists and show an appropriate message
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
      console.log(error.response?.data?.error || error.message); // Log detailed error
    }
  };

  // Redirect if already logged in
  if (isAuthorized) {
    return <Navigate to="/" />;
  }

  return (
    <div className="authPage">
      <div className="container">
        <div className="header">
          <img src="/JobZee-logos__transparent.png" alt="logo" />
          <h3>Login</h3>
        </div>
        <form onSubmit={handleLogin}>
          {/* Role selection */}
          <div className="inputTag">
            <label>Login As</label>
            <div>
              <select value={role} onChange={(e) => setRole(e.target.value)} required>
                <option value="">Select Role</option>
                <option value="Employer">Employer</option>
                <option value="Job Seeker">Job Seeker</option>
              </select>
              <FaRegUser />
            </div>
          </div>

          {/* Email input */}
          <div className="inputTag">
            <label>Email</label>
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                required
              />
              <MdOutlineMailOutline />
            </div>
          </div>

          {/* Password input */}
          <div className="inputTag">
            <label>Password</label>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Your Password"
                required
              />
              <MdPassword />
            </div>
          </div>

          <button type="submit">Login</button>
          <Link to="/register">Register</Link>
        </form>
      </div>
      <div className="banner">
        <img src="/register.png" alt="Register Banner" />
      </div>
    </div>
  );
}

export default Login;
