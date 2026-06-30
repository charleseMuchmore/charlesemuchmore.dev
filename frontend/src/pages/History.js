import React, { useEffect, useContext } from "react";
import EmploymentTimeline from "../components/EmploymentTimeline";
import JobsContext from "../context/jobs";

function History() {
    const { jobs, loading, error, fetchJobs } = useContext(JobsContext);

    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);

    useEffect(() => {
        const handleScroll = () => {
            const cards = document.querySelectorAll(".timeline-card");
            cards.forEach((card) => {
                const rect = card.getBoundingClientRect();
                if (rect.top < window.innerHeight - 100) {
                    card.classList.add("show");
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [jobs]);

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">My Work History</h1>
            {loading && <p>Loading experience...</p>}
            {error && <p className="text-danger">{error}</p>}
            {!loading && !error && <EmploymentTimeline jobs={jobs} />}
        </div>
    );
}

export default History;