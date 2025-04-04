import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../main";
import { useNavigate, useParams ,Link} from "react-router-dom";
import axios from "axios";


// SINGLE JOB DATA FROM THE BACKEND
function JobDetails() {
  const { id } = useParams();
  const [jobDetails, setjobDetais] = useState({});
  const { isAuthorized ,user} = useContext(Context);
  const navigateTo = useNavigate();
  if (!isAuthorized) {
    navigateTo("/login");
  }

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/job/details/${id}`,
          { withCredentials: true }
        );
        if (response.status == 200) {
          setjobDetais(response.data.data);
        }
        console.log(response.data.data.title);
      } catch (error) {
        if (error.response) {
          // Server responded with a status other than 2xx
          console.error("Server Error:", error.response.data.message || error.response.data);
        } else if (error.request) {
          // Request was made, but no response received
          console.error("Network Error: No response from server");
        } else {
          // Something else happened
          console.error("Unexpected Error:", error.message);
        }
      }
    };
    fetchJobDetails();
  }, [id , isAuthorized]);
  return (
    <>
    <div className="jobDetail page">
      <div className="container">
        <h3>Job Details</h3>
        <div className="banner">
          <p>Title: {jobDetails.title} </p>
          <p>Category: {jobDetails.category}</p>
          <p>Country:  {jobDetails.country}</p>
          <p>Location:  {jobDetails.location}</p>
          <p>City:  {jobDetails.city}</p>
          <p>Description: {jobDetails.description}</p>
          <p>Posted On : {jobDetails.jobPostedOn}</p>
          <p>Salary : {jobDetails.fixedSalary}</p>
          <p>
         {user && user.role == "Employer" ? <></> : <>
          <button><Link to={`application/${jobDetails._id}`}>Apply for job</Link></button>  </>}
          </p>
        </div>
      </div>
    </div>

    </>
  );
}

export default JobDetails;
