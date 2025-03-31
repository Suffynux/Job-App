import React, { useState, useContext } from "react";
import { Context } from "../../main.jsx";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {GiHamburgerMenu} from "react-icons/gi"
import "./App.css";
function Navbar() {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        { withCredentials: true }
      );
      toast.success(response.data.user);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };
  return (
    <>
      <div>
        <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
          <div className="container">
            <div className="logo">
              <img src="JobZee-logos__white.png " alt="logo" />
            </div>
            <ul className={!show ? "menu" : "menu-show -menu"}>
              <li>
                <Link
                  to={"/job"}
                  onClick={() => {
                    setShow(false);
                  }}
                >
                  All Jobs
                </Link>
                </li>
                <li>
                <Link
                 
                  to={"/application/me"}
                  onClick={() => {
                    setShow(false);
                  }}
                >
                  {
                    user && user.role === "Employer" ? "APPLICANT'S APPLICATIONS" : "MY APPLICATOINS" 
                  }
                </Link>
              </li>
              
                <li>
                  {
                    user && user.role == "Employer" ? ( <>
                    <li>
                      <Link to={"/job/post"} onClick={() => setShow(false)}>Post a Job</Link>
                    </li>
                    <li>
                      <Link to={"/job/me"} onClick={() => setShow(false)}>View your jobs</Link>
                    </li>
                    </>) : <></>
                  }
                <Link>
                </Link>
              </li>
              <button onClick={handleLogout}>Logout</button>
            </ul>
            <div className="GiHamburgerMenu">
            <GiHamburgerMenu />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
