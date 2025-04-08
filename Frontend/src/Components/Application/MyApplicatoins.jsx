import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import ResumeModel from "./ResumeModel";
import { useNavigate } from "react-router-dom";

const MyApplications = () => {
  const { isAuthorized, user } = useContext(Context);

  const [applications, setApplications] = useState([]);
  const [model, setModel] = useState(false);
  const [resumeUrl, setResumeUrl] = useState("");
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchedData = async () => {
      try {
        if (user && user.role === "Employer") {
          const response = await axios.get(
            "http://localhost:4000/api/v1/application/getmyapplications",
            { withCredentials: true }
          );
          if (response.status === 200) {
            setApplications(response?.data.data);
            toast.success(response?.data.message || "Application fetched successfully");
          }
        } else {
          const response = await axios.get(
            "http://localhost:4000/api/v1/application/jobapplications",
            { withCredentials: true }
          );
          if (response.status === 200) {
            setApplications(response.data.data);
            console.log(response);
          }
        }
      } catch (error) {
        toast.error("Server Error while fetching jobs");
      }
    };

    fetchedData();
  }, [isAuthorized, user]);

  if (!isAuthorized || user.role !== "Job Seeker") {
    navigateTo("/login");
  }

  const deleteJob = async (id) => {
    try {
      const deletedJob = await axios.delete(
        `http://localhost:4000/api/v1/application/delete/${id}`,
        { withCredentials: true }
      );
      if (deletedJob?.status === 200) {
        setApplications((prevApps) =>
          prevApps.filter((application) => application._id !== id)
        );
        toast.success("Application deleted successfully");
      }
    } catch (error) {
      toast.error("Error while deleting job");
    }
  };

  const openModel = (imageUrl) => {
    setResumeUrl(imageUrl);
    setModel(true);
  };

  const closeModel = () => {
    setModel(false);
  };

  return (
    <section className="my_applications">
      {user && user.role === "Job Seeker" ? (
        <div className="container">
          <h2>My Applications</h2>
          {applications.map((application) => (
            <JobSeekerCard
              element={application}
              key={application._id}
              deleteApplication={deleteJob}
              openModel={openModel}
            />
          ))}
        </div>
      ) : (
        <div className="container">
          <h2>Applications From Job Seekers</h2>
          {applications.map((application) => (
            <EmployerCard
              element={application}
              key={application._id}
              openModel={openModel}
            />
          ))}
        </div>
      )}

      {model && <ResumeModel imageUrl={resumeUrl} onClose={closeModel} />}
    </section>
  );
};

export default MyApplications;

// JobSeekerCard component
const JobSeekerCard = ({ element, deleteApplication, openModel }) => {
  return (
    <div className="job_seeker_card">
      <p>
        <span>Name:</span>{element.name}
      </p>
      <p>
        <span>Phone:</span>{element.phone}
      </p>
      <p>
        <span>Address:</span>{element.address}
      </p>
      <p>
        <span>Cover Letter:</span>{element.coverLetter}
      </p>
      <div className="resume">
        <img
          src={element.resume?.url}
          alt="resume"
          onClick={() => openModel(element.resume.url)}
        />
      </div>
      <div className="btn_area">
        <button onClick={() => deleteApplication(element._id)} onClickCapture>
          Delete Application
        </button>
      </div>
    </div>
  );
};

// EmployerCard component (incomplete, assuming future updates)
const EmployerCard = ({ element, openModel }) => {
  return <div className="employer_card">Employer details can go here</div>;
};
