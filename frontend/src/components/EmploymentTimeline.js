import React from "react";
import "./EmploymentTimeline.css";

const EmploymentTimeline = ({ jobs = [] }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  return (
    <div className="timeline-container">
      {jobs.length === 0 ? (
        <p>No experience entries found.</p>
      ) : (
        jobs.map((job, index) => {
          const startDate = formatDate(job.StartDate);
          const endDate = job.CurrentJob ? 'Present' : formatDate(job.EndDate);
          const duration = `${startDate} - ${endDate}`;

          return (
            <div
              key={job.JID}
              className={`timeline-card ${
                index % 2 === 0 ? "fly-in-left" : "fly-in-right"
              }`}
            >
              <h2>{job.Title}</h2>
              <h3>{job.Company}</h3>
              <p className="location">{job.Location}</p>
              <p className="duration">{duration}</p>
              {job.CurrentJob ? <span className="current-badge">Current</span> : null}
              <p>{job.Description}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default EmploymentTimeline;
