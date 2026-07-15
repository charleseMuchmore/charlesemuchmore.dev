import React, { useEffect, useContext, useState } from "react";
import JournalContext from "../context/journal";
import "./Journal.css";

function Journal() {
    const { entries, loading, error, fetchEntries } = useContext(JournalContext);
    const [expandedEntryId, setExpandedEntryId] = useState(null);

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

    const toggleEntry = (entryId) => {
        setExpandedEntryId((currentId) => (currentId === entryId ? null : entryId));
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
                        entries.map((entry) => {
                            const entryId = entry.EntryID ?? entry.EID;
                            const isExpanded = expandedEntryId === entryId;
                            const previewText = entry.Description || entry.Body || entry.Content || '';
                            const fullBody = entry.Body || entry.Content || '';

                            return (
                                <article key={entryId} className="journal-entry">
                                    <div className="entry-header">
                                        <h2 className="entry-title">{entry.Title}</h2>
                                        <time className="entry-date">{formatDate(entry.CreatedAt || entry.Date)}</time>
                                    </div>
                                    <div className="entry-content">
                                        <p>{isExpanded ? fullBody : previewText}</p>
                                        {fullBody && fullBody !== previewText && (
                                            <button
                                                type="button"
                                                className="entry-toggle"
                                                onClick={() => toggleEntry(entryId)}
                                            >
                                                {isExpanded ? 'Hide full entry' : 'Read more'}
                                            </button>
                                        )}
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
                            );
                        })
                    ) : (
                        <p className="text-center text-muted">No journal entries yet. Start writing!</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Journal;
