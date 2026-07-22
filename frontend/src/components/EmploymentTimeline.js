import React from "react";
import "./EmploymentTimeline.css";

const EmploymentTimeline = ({ experiences = [] }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  return (
    <div className="timeline-container">
      {experiences.length === 0 ? (
        <p>No experience entries found.</p>
      ) : (
        experiences.map((experience, index) => {
          const startDate = formatDate(experience.StartDate);
          const endDate = experience.CurrentJob ? 'Present' : formatDate(experience.EndDate);
          const duration = `${startDate} - ${endDate}`;

          return (
            <div
              key={experience.XID}
              className={`timeline-card ${
                index % 2 === 0 ? "fly-in-left" : "fly-in-right"
              }`}
            >
              <h2>{experience.Title}</h2>
              <h3>{experience.Company}</h3>
              <p className="location">{experience.Location}</p>
              <p className="duration">{duration}</p>
              {experience.CurrentJob ? <span className="current-badge">Current</span> : null}
              <p>{experience.Description}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default EmploymentTimeline;
