import React, { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Legend
} from 'recharts';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

function AdminAnalyticsTab() {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/analytics/summary?days=14`);
        if (!response.ok) {
          throw new Error(`Unable to load analytics data from ${API_BASE_URL}/analytics/summary`);
        }
        const payload = await response.json();
        setSummary(payload);
      } catch (err) {
        setError(err.message || 'Unable to load analytics data');
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) return <p>Loading analytics...</p>;
  if (error) return <p>{error}</p>;

  const timelineData = (summary?.timeline || []).map((d) => ({
    date: d.date,
    total_events: Number(d.total_events || 0),
    new_sessions: Number(d.new_sessions || 0)
  }));

  const topPages = (summary?.top_pages || []).map((p) => ({ name: p.page_path, value: Number(p.count || 0) }));
  const topInteractions = (summary?.top_interactions || []).map((i) => ({ name: i.label || (i.element_text || i.event_name), value: Number(i.count || 0) }));

  return (
    <div>
      <h3>Analytics Overview</h3>
      <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', marginBottom: '20px' }}>
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '12px' }}>
          <strong>Total Events</strong>
          <div>{summary?.totals?.total_events ?? 0}</div>
        </div>
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '12px' }}>
          <strong>Page Views</strong>
          <div>{summary?.totals?.page_views ?? 0}</div>
        </div>
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '12px' }}>
          <strong>Clicks</strong>
          <div>{summary?.totals?.clicks ?? 0}</div>
        </div>
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '12px' }}>
          <strong>New Sessions</strong>
          <div>{summary?.totals?.new_sessions ?? 0}</div>
        </div>
      </div>

      <div style={{ background: '#fff', padding: 20, borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <h4 style={{ textAlign: 'center' }}>Daily trend</h4>
        {timelineData.length === 0 ? (
          <p>No timeline data available</p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={timelineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total_events" stroke="#8884d8" name="Total Events" />
              <Line type="monotone" dataKey="new_sessions" stroke="#82ca9d" name="New Sessions" />
            </LineChart>
          </ResponsiveContainer>
        )}

        <h4 style={{ marginTop: 20, textAlign: 'center' }}>Top pages</h4>
        {topPages.length === 0 ? (
          <p>No page data available</p>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={topPages} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        )}

        <h4 style={{ marginTop: 20, textAlign: 'center' }}>Top interactions</h4>
        {topInteractions.length === 0 ? (
          <p>No interaction data available</p>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={topInteractions} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" />
              <Tooltip />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default AdminAnalyticsTab;
