import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ExperiencesContext from "../context/experiences";
import ProjectsContext from "../context/projects";
import JournalContext from "../context/journal";
import JoyContext from "../context/joy";
import "./Now.css";

const Now = () => {
    const navigate = useNavigate();
    const { experiences, fetchExperiences } = useContext(ExperiencesContext);
    const { projects, fetchProjects } = useContext(ProjectsContext);
    const { entries, fetchEntries } = useContext(JournalContext);
    const { joys, fetchJoys } = useContext(JoyContext);

    useEffect(() => {
        fetchExperiences();
        fetchProjects();
        fetchEntries();
        fetchJoys();
    }, [fetchExperiences, fetchProjects, fetchEntries, fetchJoys]);

    const currentJobs = (Array.isArray(experiences) ? experiences : []).filter(job => job.CurrentJob);
    const recentProjects = (Array.isArray(projects) ? projects : []).slice(0, 3);
    const recentEntries = (Array.isArray(entries) ? entries : []).slice(0, 2);
    const recentJoys = (Array.isArray(joys) ? joys : []).slice(0, 3);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short' 
        });
    };

    return (
        <div className="now-container">
            <h2>Now</h2>
            <p className="text-muted">A snapshot of what I'm currently working on and enjoying.</p>
            
            {/* Current Jobs Section */}
            <section className="now-section">
                <h3>Current Work</h3>
                {currentJobs.length > 0 ? (
                    <div className="now-items">
                        {currentJobs.map(job => (
                            <div key={job.XID || job.JID} className="now-item">
                                <h4>{job.Title}</h4>
                                <p className="now-subtitle">{job.Company}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="section-placeholder">No current jobs listed</p>
                )}
            </section>

            {/* Recent Projects Section */}
            <section className="now-section">
                <h3>Recent Projects</h3>
                {recentProjects.length > 0 ? (
                    <div className="now-items">
                        {recentProjects.map(project => (
                            <div key={project.PID} className="now-item">
                                <h4>{project.Name}</h4>
                                <p className="now-subtitle">{project.ShortDescription}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="section-placeholder">No projects yet</p>
                )}
                <button className="now-link-btn" onClick={() => navigate('/Projects')}>View All Projects</button>
            </section>

            {/* Journal Entries Section */}
            <section className="now-section">
                <h3>Recent Journal Entries</h3>
                {recentEntries.length > 0 ? (
                    <div className="now-items">
                        {recentEntries.map(entry => (
                            <div key={entry.EntryID} className="now-item">
                                <h4>{entry.Title}</h4>
                                <p className="now-date">{formatDate(entry.CreatedAt || entry.Date)}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="section-placeholder">No journal entries yet</p>
                )}
                <button className="now-link-btn" onClick={() => navigate('/Journal')}>Read Full Journal</button>
            </section>

            {/* Joys Section */}
            <section className="now-section">
                <h3>Recent Joys</h3>
                {recentJoys.length > 0 ? (
                    <div className="now-items">
                        {recentJoys.map(joy => (
                            <div key={joy.JoyID} className="now-item">
                                <h4>{joy.Title}</h4>
                                <p className="now-subtitle">{joy.Description}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="section-placeholder">No joys added yet</p>
                )}
                <button className="now-link-btn" onClick={() => navigate('/Joy')}>Explore More Joys</button>
            </section>
        </div>
    );
};

export default Now;
