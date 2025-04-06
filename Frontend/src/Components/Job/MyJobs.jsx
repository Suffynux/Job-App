import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../../main.jsx";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { TbAsterisk } from "react-icons/tb";

/**
 * Purpose: Allows employers to view, edit, and delete their posted jobs
 */
function MyJobs() {
  // Access the global context for authentication status and user data
  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();

  const [jobs, setJobs] = useState([]); // Array to store all jobs posted by the employer
  const [editable, setEditable] = useState(false); // Tracks which job is currently in edit mode (stores job ID)

  // Effect hook to fetch all jobs posted by the current employer when component mounts
  useEffect(() => {
    // Fetching all jobs
    const fetchJobs = async () => {
      try {
        // API call to fetch jobs posted by the logged-in employer
        const response = await axios.get(
          "http://localhost:4000/api/v1/job/getmyjobs",
          {
            withCredentials: true, // Send cookies for authentication
          }
        );

        if (response.status === 200) {
          // Update state with the fetched jobs
          setJobs(response.data.data);
          // Display success message
          toast.success(
            response.data.message || "User jobs fetched successfully"
          );
        }
      } catch (error) {
        // Display error message if API call fails
        toast.error(
          error.response?.data?.message || "Error while fetching jobs"
        );
      }
    };

    fetchJobs();
  }, []); // Empty dependency array means this runs once when component mounts

  // Effect hook to redirect non-employers to home page
  useEffect(() => {
    if (!isAuthorized || (user && user.role !== "Employer")) {
      navigateTo("/"); // Redirect to home if user is not authorized or not an employer
    }
  }, [isAuthorized, user, navigateTo]); // Run when these dependencies change

  // Function to enable editing mode for a specific job
  const handleEditMode = (jobId) => {
    setEditable(jobId); // Set the job ID that's currently being edited
  };

  // Function to disable editing mode
  const handleUnEditMode = () => {
    setEditable(null); // Clear the editable state
  };

  // Function to submit edited job data to the server
  const handleEditJob = async (jobId) => {
    // Find the specific job being edited from the jobs array
    const updatedJob = jobs.find((job) => job._id === jobId);

    try {
      // API call to update the job
      const res = await axios.patch(
        `http://localhost:4000/api/v1/job/update/${jobId}`,
        updatedJob, // Send the updated job object
        {
          withCredentials: true, // Send cookies for authentication
        }
      );
   
      toast.success(res.data.message || "Job updated successfully");
      setEditable(null); 
    } catch (err) {
      toast.error(err.response?.data?.message || "Error while updating job");
    }
  };

  // Function to delete a job
  const handleDeleteJob = async (jobId) => {
    try {
      // API call to delete the job
      const res = await axios.delete(
        `http://localhost:4000/api/v1/job/delete/${jobId}`,
        {
          withCredentials: true, // Send cookies for authentication
        }
      );
      // Display success message
      toast.success(res.data?.message || "Job deleted successfully");
      // Update state by filtering out the deleted job
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      // Display error message if deletion fails
      toast.error(error.response?.data?.message || "Error while deleting job");
    }
  };

  // Function to handle input changes in the form fields
  const handleInputChange = (jobId, field, value) => {
    // Update the jobs state by mapping through and updating the specific job
    setJobs((prevJobs) =>
      prevJobs.map((job) => {
        if (job._id === jobId) {
          return { ...job, [field]: value }; // Update the specified field
        } else {
          return job; // Return unchanged jobs
        }
      })
    );
  };

  return (
    <>
      <div className="myJobs page">
        <div className="container">
          <h1>Your Posted Jobs</h1>
          {jobs.length > 0 ? (
            // If jobs exist, render them
            <>
              <div className="banner">
                {jobs.map((job) => {
                  return (
                    // Job card for each job
                    <div className="card" key={job._id}>
                      <div className="content">
                        {/* Short fields section - contains job metadata */}
                        <div className="short_fields">
                          {/* Job title field */}
                          <div>
                            <span>Title:</span>
                            <input
                              type="text"
                              disabled={editable !== job._id} // Only editable when this job is in edit mode
                              value={job.title}
                              onChange={(e) =>
                                handleInputChange(
                                  job._id,
                                  "title",
                                  e.target.value
                                )
                              }
                            />
                          </div>

                          {/* Country field */}
                          <div>
                            <span>Country:</span>
                            <input
                              type="text"
                              disabled={editable !== job._id}
                              value={job.country}
                              onChange={(e) =>
                                handleInputChange(
                                  job._id,
                                  "country",
                                  e.target.value
                                )
                              }
                            />
                          </div>

                          {/* City field */}
                          <div>
                            <span>City:</span>
                            <input
                              type="text"
                              disabled={editable !== job._id}
                              value={job.city}
                              onChange={(e) =>
                                handleInputChange(
                                  job._id,
                                  "city",
                                  e.target.value
                                )
                              }
                            />
                          </div>

                          {/* Category dropdown */}
                          <div>
                            <span>Category:</span>
                            <select
                              value={job.category}
                              onChange={(e) =>
                                handleInputChange(
                                  job._id,
                                  "category",
                                  e.target.value
                                )
                              }
                              disabled={editable !== job._id}
                            >
                              <option value="">Select Category</option>
                              {/* List of job categories */}
                              <option value="Graphics & Design">
                                Graphics & Design
                              </option>
                              <option value="Mobile App Development">
                                Mobile App Development
                              </option>
                              {/* More categories... */}
                            </select>
                          </div>

                          {/* Salary field - handles both fixed salary and salary range */}
                          <div>
                            <span>Salary: </span>
                            {job.fixedSalary ? (
                              // If fixed salary exists, show one input
                              <>
                                <input
                                  value={job.fixedSalary}
                                  type="number"
                                  disabled={editable !== job._id}
                                  onChange={(e) => {
                                    handleInputChange(
                                      job._id,
                                      "fixedSalary",
                                      e.target.value
                                    );
                                  }}
                                />
                              </>
                            ) : (
                              // Otherwise show salary range inputs (from-to)
                              <>
                                <input
                                  value={job.salaryFrom}
                                  type="number"
                                  disabled={editable !== job._id}
                                  onChange={(e) => {
                                    handleInputChange(
                                      job._id,
                                      "salaryFrom",
                                      e.target.value
                                    );
                                  }}
                                />

                                <input
                                  value={job.salaryTo}
                                  type="number"
                                  disabled={editable !== job._id}
                                  onChange={(e) => {
                                    handleInputChange(
                                      job._id,
                                      "salaryTo",
                                      e.target.value
                                    );
                                  }}
                                />
                              </>
                            )}
                          </div>

                          {/* Job expiration status dropdown */}
                          <div>
                            <span>Expired: </span>
                            <select
                              value={job.expired}
                              disabled={editable !== job._id}
                              onChange={(e) => {
                                handleInputChange(
                                  job._id,
                                  "expired",
                                  e.target.value
                                );
                              }}
                            >
                              <option value={true}>TRUE</option>
                              <option value={false}>FALSE</option>
                            </select>
                          </div>
                        </div>

                        {/* Long fields section - contains longer text content */}
                        <div className="long_field">
                          {/* Job description textarea */}
                          <div>
                            <span>
                              Description :
                              <textarea
                                rows="5"
                                value={job.description}
                                onChange={(e) => {
                                  handleInputChange(
                                    job._id,
                                    "description",
                                    e.target.value
                                  );
                                }}
                                disabled={editable !== job._id}
                              ></textarea>
                            </span>
                          </div>

                          {/* Job location textarea */}
                          <div>
                            <span>
                              Location :
                              <textarea
                                rows="5"
                                value={job.location}
                                onChange={(e) => {
                                  handleInputChange(
                                    job._id,
                                    "location",
                                    e.target.value
                                  );
                                }}
                                disabled={editable !== job._id}
                              ></textarea>
                            </span>
                          </div>
                        </div>

                        {/* Action buttons section */}
                        <div className="button_wrapper">
                          <div className="edit_btn_wrapper">
                            {editable === job._id ? (
                              // When in edit mode, show Save (check) and Cancel (cross) buttons
                              <>
                                <button
                                  onClick={() => handleEditJob(job._id)}
                                  className="check_btn"
                                >
                                  <FaCheck />{" "}
                                  {/* Checkmark icon for saving changes */}
                                </button>
                                <button
                                  className="cross_btn"
                                  onClick={handleUnEditMode}
                                >
                                  <RxCross2 />{" "}
                                  {/* Cross icon for canceling changes */}
                                </button>
                              </>
                            ) : (
                              // When not in edit mode, show Edit button
                              <>
                                <button
                                  onClick={() => handleEditMode(job._id)}
                                  className="edit_btn"
                                >
                                  Edit
                                </button>
                              </>
                            )}
                          </div>
                          {/* Delete button - always visible */}
                          <button
                            onClick={() => handleDeleteJob(job._id)}
                            className="delete_btn"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            // If no jobs exist, show message
            <>
              <p>You have not posted any job</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default MyJobs;
