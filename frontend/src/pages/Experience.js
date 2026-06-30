import React, { useEffect, useContext } from "react";
import EmploymentTimeline from "../components/EmploymentTimeline";
import ExperiencesContext from "../context/experiences";

function Experience() {
    const { experiences, loading, error, fetchExperiences } = useContext(ExperiencesContext);

    useEffect(() => {
        fetchExperiences();
    }, [fetchExperiences]);

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
    }, [experiences]);

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">My Work Experience</h1>
            {loading && <p>Loading experience...</p>}
            {error && <p className="text-danger">{error}</p>}
            {!loading && !error && <EmploymentTimeline experiences={experiences} />}
        </div>
    );
}

export default Experience;
