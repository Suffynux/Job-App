import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
function Register() {
  const { email, setemail } = useState("");
  const { password, setpasswrd } = useState("");
  const { name, setname } = useState("");
  const { role, setrole } = useState("");
  const { phone, setphone } = useState("");
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);
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
      
    } catch (error) {
      console.error(error);
    }
  };

  return <></>;
}

export default Register;
