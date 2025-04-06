import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../../main.jsx";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { TbAsterisk } from "react-icons/tb";

function MyJobs() {
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    // Fetching all jobs
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/job/getmyjobs",
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          setJobs(response.data.data);
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
  const handleEditMode = (jobId) => {
    setEditable(jobId);
  };

  const handleUnEditMode = () => {
    setEditable(null);
  };

  // Function for editing job
  const handleEditJob = async (jobId) => {
    const updatedJob = jobs.find((job) => job._id === jobId);
    
    try {
      const res = await axios.patch(
        `http://localhost:4000/api/v1/job/update/${jobId}`, 
        updatedJob, 
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message || "Job updated successfully");
      setEditable(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error while updating job");
    }
  };

  // Function for delete job
  const handleDeleteJob = async (jobId) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/v1/job/delete/${jobId}`,
        {
          withCredentials: true,
        }
      );
      toast.success(res.data?.message || "Job deleted successfully");
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      toast.error(error.response?.data?.message || "Error while deleting job");
    }
  };

  const handleInputChange = (jobId, field, value) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) => {
        if (job._id === jobId) {
          return { ...job, [field]: value };
        } else {
          return job;
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
            <>
              <div className="banner">
                {jobs.map((job) => {
                  return (
                    <div className="card" key={job._id}>
                      <div className="content">
                        <div className="short_fields">
                          <div>
                            <span>Title:</span>
                            <input
                              type="text"
                              disabled={editable !== job._id}
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
                              <option value="Graphics & Design">
                                Graphics & Design
                              </option>
                              <option value="Mobile App Development">
                                Mobile App Development
                              </option>
                              <option value="Frontend Web Development">
                                Frontend Web Development
                              </option>
                              <option value="MERN Stack Development">
                                MERN STACK Development
                              </option>
                              <option value="Account & Finance">
                                Account & Finance
                              </option>
                              <option value="Artificial Intelligence">
                                Artificial Intelligence
                              </option>
                              <option value="Video Animation">
                                Video Animation
                              </option>
                              <option value="MEAN Stack Development">
                                MEAN STACK Development
                              </option>
                              <option value="MEVN Stack Development">
                                MEVN STACK Development
                              </option>
                              <option value="Data Entry Operator">
                                Data Entry Operator
                              </option>
                            </select>
                          </div>
                          <div>
                            <span>Salary: </span>
                            {job.fixedSalary ? (
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

                        <div className="long_field">
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
                        <div className="button_wrapper">
                          <div className="edit_btn_wrapper">
                            {
                              editable === job._id ? (
                                <>
                                  <button onClick={() => handleEditJob(job._id)} className="check_btn">
                                    <FaCheck />
                                  </button>
                                  <button
                                    className="cross_btn" 
                                    onClick={handleUnEditMode}
                                  >
                                    <RxCross2 />
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button onClick={() => handleEditMode(job._id)} className="edit_btn">
                                    Edit
                                  </button>
                                </>
                              )
                            }
                          </div>
                          <button onClick={() => handleDeleteJob(job._id)} className="delete_btn">
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