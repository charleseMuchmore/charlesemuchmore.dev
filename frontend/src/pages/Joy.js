import React, { useEffect, useContext } from "react";
import JoyContext from "../context/joy";
import "./Joy.css";

function Joy() {
    const { joys, loading, error, fetchJoys } = useContext(JoyContext);

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

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Joy</h1>
            <p className="text-center text-muted mb-5">Things that bring me joy and happiness</p>

            {loading && <div className="text-center"><p>Loading...</p></div>}
            {error && <div className="alert alert-danger text-center">{error}</div>}

            {!loading && !error && (
                <div className="joys-grid">
                    {joys.length > 0 ? (
                        joys.map((joy) => (
                            <div key={joy.JoyID} className="joy-card">
                                <div className="joy-header">
                                    <h3>{joy.Title}</h3>
                                    {joy.CreatedAt && (
                                        <span className="joy-date">{formatDate(joy.CreatedAt)}</span>
                                    )}
                                </div>
                                <p className="joy-description">{joy.Description}</p>
                                {joy.Category && (
                                    <span className="joy-category">{joy.Category}</span>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-muted col-12">No joys added yet. Come back soon!</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Joy;
