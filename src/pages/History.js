import React, { useEffect } from "react";
import EmploymentTimeline from "../components/EmploymentTimeline";

function History() {

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
        handleScroll(); // Trigger the effect on load
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);

    return (
        <div>
            <EmploymentTimeline />
        </div>
    )
}

export default History;