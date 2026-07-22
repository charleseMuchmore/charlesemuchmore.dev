import React, { useEffect, useContext, useState } from "react";
import JoyContext from "../context/joy";
import "./Joy.css";

function Joy() {
    const { joys, loading, error, fetchJoys } = useContext(JoyContext);
    const [expandedJoyId, setExpandedJoyId] = useState(null);

    useEffect(() => {
        fetchJoys();
    }, [fetchJoys]);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const toggleJoy = (joyId) => {
        setExpandedJoyId((currentId) => (currentId === joyId ? null : joyId));
    };

    const getJoyText = (joy, isExpanded) => {
        const shortText = joy.ShortDescription || joy.Description || '';
        const fullText = joy.FullDescription || joy.Description || shortText;
        if (isExpanded) {
            return fullText;
        }
        return shortText || fullText;
    };

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Joy</h1>
            <p className="text-center text-muted mb-5">Things that bring me joy and happiness</p>

            {loading && <div className="text-center"><p>Loading...</p></div>}
            {error && <div className="alert alert-danger text-center">{error}</div>}

            {!loading && !error && (
                <div className="joys-grid">
                    {joys.length > 0 ? (
                        joys.map((joy) => {
                            const joyId = joy.JoyID ?? joy.JID ?? joy.id ?? joy.ID;
                            const isExpanded = expandedJoyId === joyId;
                            const contentText = getJoyText(joy, isExpanded);
                            const shortText = joy.ShortDescription || joy.Description || '';
                            const fullText = joy.FullDescription || joy.Description || shortText;
                            const showToggle = shortText && fullText && shortText !== fullText;

                            return (
                                <button
                                    key={joyId}
                                    type="button"
                                    className={`joy-card ${isExpanded ? 'expanded' : ''}`}
                                    onClick={() => toggleJoy(joyId)}
                                    aria-expanded={isExpanded}
                                >
                                    <div className="joy-header">
                                        <h3>{joy.Title}</h3>
                                        {joy.CreatedAt && (
                                            <span className="joy-date">{formatDate(joy.CreatedAt)}</span>
                                        )}
                                    </div>
                                    <p className="joy-description">{contentText}</p>
                                    {showToggle && (
                                        <span className="joy-toggle-label">
                                            {isExpanded ? 'Hide description' : 'Read more'}
                                        </span>
                                    )}
                                    {joy.Category && (
                                        <span className="joy-category">{joy.Category}</span>
                                    )}
                                </button>
                            );
                        })
                    ) : (
                        <p className="text-center text-muted col-12">No joys added yet. Come back soon!</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Joy;
