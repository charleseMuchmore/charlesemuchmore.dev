import React, { useEffect, useContext } from "react";
import JournalContext from "../context/journal";
import "./Journal.css";

function Journal() {
    const { entries, loading, error, fetchEntries } = useContext(JournalContext);

    useEffect(() => {
        fetchEntries();
    }, [fetchEntries]);

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
            <h1 className="text-center mb-4">Journal</h1>
            <p className="text-center text-muted mb-5">Thoughts, reflections, and moments in time</p>

            {loading && <div className="text-center"><p>Loading...</p></div>}
            {error && <div className="alert alert-danger text-center">{error}</div>}

            {!loading && !error && (
                <div className="journal-entries">
                    {entries.length > 0 ? (
                        entries.map((entry) => (
                            <article key={entry.EntryID} className="journal-entry">
                                <div className="entry-header">
                                    <h2 className="entry-title">{entry.Title}</h2>
                                    <time className="entry-date">{formatDate(entry.CreatedAt || entry.Date)}</time>
                                </div>
                                <div className="entry-content">
                                    <p>{entry.Content || entry.Body}</p>
                                </div>
                                {entry.Tags && (
                                    <div className="entry-tags">
                                        {entry.Tags.split(',').map((tag, idx) => (
                                            <span key={idx} className="tag">
                                                #{tag.trim()}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </article>
                        ))
                    ) : (
                        <p className="text-center text-muted">No journal entries yet. Start writing!</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Journal;
