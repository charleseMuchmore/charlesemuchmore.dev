import React from "react";
import "./EmploymentTimeline.css";

const jobs = [
  {
    id: 1,
    title: "IT Specialist",
    company: "Comfort Flow Heating",
    duration: "March 2025 - Present",
    description: "Handling IT Tickets and support requests, provisioning new and replacement devices, managing accounts in Microsoft 365.",
  },
  {
    id: 2,
    title: "Shift Lead",
    company: "McDonald's",
    duration: "October 2024 - March 2025",
    description: "Led shifts by positioning people in strategic roles within the restaurant, identifying danger zones, delegating tasks, and solving problems.",
  },
  {
    id: 3,
    title: "Tech Excelerator Student",
    company: "Connected Lane County",
    duration: "October 2024 - December 2024",
    description: "Participated in a tech training experience that ended with an internship at Partnered Solutions IT.",
  },
  {
    id: 4,
    title: "Temporary Intern",
    company: "Wylight Technologies",
    duration: "August 2024 - October 2024",
    description: "Gained experience developing software products with development on a team.",
  },
  {
    id: 5,
    title: "Temporary Intern",
    company: "Oregon Criminal Defense Lawyers Association",
    duration: "April 2024 - July 2024",
    description: "Developed and maintained client websites using modern frameworks.",
  },
  {
    id: 6,
    title: "Crew Member",
    company: "McDonald's",
    duration: "April 2022 - October 2024",
    description: "Carried out daily restaurant tasks, such as making sandwiches or taking orders.",
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
