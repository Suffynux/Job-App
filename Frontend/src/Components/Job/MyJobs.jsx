import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../../main.jsx";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { TbAsterisk } from "react-icons/tb";

function MyJobs() {
  const { isAuthorized, user } = useContext(Context); // Fixed spelling
  const navigateTo = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/job/getmyjobs",
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          setJobs(response.data.jobs);
          toast.success(
            response.data.message || "User jobs fetched successfully"
          );
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Error while fetching jobs"
        );
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    if (!isAuthorized || (user && user.role !== "Employer")) {
      navigateTo("/");
    }
  }, [isAuthorized, user, navigateTo]);


  // Enabling editing mode

  const handleEditMode = async (jobId)=>{
    setEditable(jobId)
  }
  
  const handleUnEditMode = async (jobId)=>{
    setEditable(jobId)
  }

  // Function for editing job
  const handleEditJob = async(jobId)=>{
    const updatedJob = await jobs.find((job)=>job._id === jobId)
    await axios.put(`http://localhost:4000/api/v1/job/update/${jobId}` , updatedJob , {withCredentials: true}).then(res=>{
      toast.success(res.data.messgae)
      setEditable(null)
    }).catch(err=>{
      toast.error(err.res.data.message || "error while...")
    })
  }

  // Funtion for delete job
  const handleDeleteJob = async(jobId)=>{
    try {
      await axios.delete(`http://localhost:4000/api/v1/job/delete/${jobId}`).
      then(res=>{
        toast.success(res.data?.message)
        setJobs(prevJob=> prevJob.filter(job=>job._id !== jobId))
      })
    } catch (error) {
      toast.error(error.response?.data?.message || "Error while deleting job")
    }
  }

  return <h1>My Jobs</h1>; // You can add a list of jobs later
}

export default MyJobs;
