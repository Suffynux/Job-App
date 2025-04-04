import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../main.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function PostJob() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [salaryType, setSalaryType] = useState("");

  const navigateTo = useNavigate();
  const { isAuthorized } = useContext(Context);

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/login");
    }
  }, [isAuthorized, navigateTo]);

  // function for sending data
  const handleJobPost = async (e) => {
    e.preventDefault();

    let payload;
    if (salaryType === "Fixed Salary") {
      payload = {
        title,
        description,
        country,
        city,
        location,
        category,
        fixedSalary,
      };
    } else if (salaryType === "Ranged Salary") {
      payload = {
        title,
        description,
        country,
        city,
        location,
        category,
        salaryFrom,
        salaryTo,
      };
    } else {
      toast.error("Please select a salary type");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/job/postjob",
        payload,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message || "Job Posted Successfully");
        const jobId = response.data.job?._id; // make sure your API sends the created job's ID

        if (jobId) {
          navigateTo(`/job/${jobId}`);
        } else {
          navigateTo("/jobs"); // fallback to job list
        }
      }

      setTitle("");
      setDescription("");
      setCategory("");
      setCountry("");
      setLocation("")
      setCity("");

      console.log("Job posted successfully:", response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error while posting job");
    }


  };

  return (
    <div className="job_post page">
      <div className="container">
        <h3>Post New Job</h3>
        <form onSubmit={handleJobPost}>
          <div className="wrapper">
            <input
              type="text"
              value={title}
              placeholder="Job Title"
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              type="text"
              value={description}
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />

            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select Category</option>
              <option value="Graphics & Design">Graphics & Design</option>
              <option value="Mobile App Development">Mobile App Development</option>
              <option value="Frontend Web Development">Frontend Web Development</option>
              <option value="MERN Stack Development">MERN STACK Development</option>
              <option value="Account & Finance">Account & Finance</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="Video Animation">Video Animation</option>
              <option value="MEAN Stack Development">MEAN STACK Development</option>
              <option value="MEVN Stack Development">MEVN STACK Development</option>
              <option value="Data Entry Operator">Data Entry Operator</option>
            </select>
          </div>

          <div className="wrapper">
            <input type="text" value={country} placeholder="Country" onChange={(e) => setCountry(e.target.value)} />
            <input type="text" value={city} placeholder="City" onChange={(e) => setCity(e.target.value)} />
          </div>

          <input type="text" value={location} placeholder="Location" onChange={(e) => setLocation(e.target.value)} />

          <div className="salary_wrapper">
            <select value={salaryType} onChange={(e) => setSalaryType(e.target.value)}>
              <option value="">Select Salary Type</option>
              <option value="Fixed Salary">Fixed Salary</option>
              <option value="Ranged Salary">Ranged Salary</option>
            </select>

            {salaryType === "Fixed Salary" ? (
              <input type="number" placeholder="Enter Fixed Salary" value={fixedSalary} onChange={(e) => setFixedSalary(e.target.value)} />
            ) : salaryType === "Ranged Salary" ? (
              <>
                <input type="number" placeholder="Salary From" value={salaryFrom} onChange={(e) => setSalaryFrom(e.target.value)} />
                <input type="number" placeholder="Salary To" value={salaryTo} onChange={(e) => setSalaryTo(e.target.value)} />
              </>
            ) : (
              <p>Please provide Salary type *</p>
            )}
          </div>

          <button type="submit">Create a Job</button>
        </form>
      </div>
    </div>
  );
}

export default PostJob;
