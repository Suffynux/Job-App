import React from "react";
import { FaSuitcase, FaBuilding, FaUsers, FaUserPlus } from "react-icons/fa";
function Hero() {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91220",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];
  return (
    <>
      <div className="heroSection">
        <div className="container">
          <div className="title">
            <h1>Find Your Dream Job</h1>
            <p>
              Explore thousands of job opportunities with all the information
              you need. Its your future
            </p>
            <a href="/job">
              <button>Search Jobs</button>
            </a>
          </div>
          <div className="image">
            <img src="heroS.jpg" alt="" />
          </div>
        </div>
        <div className="details">
          {details.map((data) => {
            return (
              <div className="card">
                <div className="key" key={data.id}>
                  <div className="icon">{data.icon}</div>
                  <div className="content">
                    <p>{data.title}</p>
                    <p>{data.subTitle}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Hero;
