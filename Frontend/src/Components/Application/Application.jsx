import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main.jsx";
import { useFetcher, useParams } from "react-router-dom";
import axios from "axios";
function Application() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  if (!isAuthorized) {
    navigateTo("/");
  }

  // function for handle file input
  const handleFileInput = (e) => {
    const resume = req.target.files[0];
    setResume(resume);

  };
  
  // getting job id from the user
  const {id} = useParams();

  // function for seding request
  const handleApplication = async (e) => {
    e.prevantDefault();
    const formData= new FormData();
    
  }
  return <div></div>;
}

export default Application;
