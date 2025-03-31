import React, { useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import { FaPencilAlt, FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline, MdPassword, MdPhone } from "react-icons/md";
import { Link, Navigate } from "react-router-dom";

function Register() {
  const [email, setemail] = useState("");
  const [password, setpasswrd] = useState("");
  const [name, setname] = useState("");
  const [role, setrole] = useState("");
  const [phone, setphone] = useState("");
  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        { email, password, name, role, phone },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(data.message);
      setemail("");
      setname("");
      setpasswrd("");
      setphone("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      console.log(error.response?.data?.error);
      
    }
  };

  if (isAuthorized) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="authPage">
        <div className="container">
          <div className="header">
            <img src="/JobZee-logos__transparent.png" alt="logo" />
            <h3>Create a new Account</h3>
          </div>
          <form onSubmit={handleRegister}>
            <div className="inputTag">
              <label>Register As</label>
              <div>
                <select value={role} onChange={(e) => setrole(e.target.value)}>
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <FaRegUser />
              </div>
            </div>

            <div className="inputTag">
              <label>Name</label>
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  placeholder="Enter Your Name"
                />
                <FaPencilAlt />
              </div>
            </div>

            <div className="inputTag">
              <label>Email</label>
              <div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  placeholder="Enter Your Email"
                />
                <MdOutlineMailOutline />
              </div>
            </div>

            <div className="inputTag">
              <label>Phone Number</label>
              <div>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setphone(e.target.value)}
                  placeholder="Enter Your Phone Number"
                />
                <MdPhone />
              </div>
            </div>

            <div className="inputTag">
              <label>Password</label>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setpasswrd(e.target.value)}
                  placeholder="Enter Your Password"
                />
                <MdPassword />
              </div>
            </div>

            <button type="submit">Register</button>
            <Link to="/login">Login Now</Link>
          </form>
        </div>
        <div className="banner">
          <img src="/register.png" alt="Register Banner" />
        </div>
      </div>
    </>
  );
}

export default Register;
