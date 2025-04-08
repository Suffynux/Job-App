import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main.jsx";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Application() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false); // 🔄 Loader state

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
    }
  }, [isAuthorized, navigateTo]);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  const handleApplication = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loader

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const { data } = await axios.post(
        `http://localhost:4000/api/v1/application/post/`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Reset form
      setName("");
      setEmail("");
      setAddress("");
      setCoverLetter("");
      setPhone("");
      setResume(null);
      toast.success(data.message);
      navigateTo("/job");
    } catch (error) {
      toast.error(error.response?.data || "Something went wrong");
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <section>
      <div className="application">
        <div className="container">
          <h3>Application Form</h3>

          {/* Loader message */}
          {loading && (
            <p style={{ marginBottom: "15px", color: "blue", fontWeight: "bold" }}>
              Sending your application...
            </p>
          )}

          <form onSubmit={handleApplication}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />

            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              required
            />

            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              required
            />

            <textarea
              value={coverLetter}
              rows="10"
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Write your cover letter"
              required
            ></textarea>

            <div>
              <label
                style={{
                  textAlign: "center",
                  display: "block",
                  fontSize: "20px",
                }}
              >
                Select Resume
              </label>
              <input
                type="file"
                onChange={handleFileInput}
                accept=".jpg,.png,.webp"
                required
                style={{ width: "100px" }}
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Application;
