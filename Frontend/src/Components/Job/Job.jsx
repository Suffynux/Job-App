import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main.jsx";
import { useNavigate , Link } from "react-router-dom";
import axios from "axios";


// GET ALL JOBS FROM THE BACKEND
function Job() {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    // Redirect user if not authorized
    if (!isAuthorized) {
      navigateTo("/login");
      return; // Stop execution
    }

    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/job/getalljobs",
          { withCredentials: true }
        );

        if (response.status === 200) {
          setJobs(response.data.data);
        }
      } catch (err) {
        console.error("Error while fetching jobs:", err);
        setError(err.message);
      } 
    };

    fetchJobs();
  }, [isAuthorized, navigateTo]); 


  return (
    <>
        <div className="jobs page">
          <div className="container">
            <h3>Available Jobs</h3>
            <div className="banner">
              {jobs?.map((job)=>{
                return (
                  <div className="card" key={job._id}>
                    <p className="">{job.title}</p>
                    <p className="">{job.category}</p>
                    <p className="">{job.country}</p>
                    <Link to={`/job/${job._id}`}>Details</Link>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
    </>
  );
}

export default Job;
