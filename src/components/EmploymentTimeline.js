import React from "react";
import "./EmploymentTimeline.css";

const jobs = [
  {
    id: 1,
    title: "Intern",
    company: "Wylight Technologies",
    duration: "August 19, 2024-present",
    description: "",
  },
  {
    id: 2,
    title: "Intern",
    company: "Oregon Criminal Defense Lawyers Association",
    duration: "April 2024 - July 2024",
    description: "Developed and maintained client websites using modern frameworks.",
  },
  {
    id: 3,
    title: "Crew Member",
    company: "McDonald's",
    duration: "April 2022-present",
    description: "",
  },
  // Add more job entries here
];

const EmploymentTimeline = () => {
  return (
    <div className="timeline-container">
      {jobs.map((job, index) => (
        <div
          key={job.id}
          className={`timeline-card ${
            index % 2 === 0 ? "fly-in-left" : "fly-in-right"
          }`}
        >
          <h2>{job.title}</h2>
          <h3>{job.company}</h3>
          <p>{job.duration}</p>
          <p>{job.description}</p>
        </div>
      ))}
    </div>
  );
};

export default EmploymentTimeline;
