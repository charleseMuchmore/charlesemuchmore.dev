const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post('/track', async (req, res) => {
  const {
    event_type = 'page_view',
    page_path = '/',
    event_name = null,
    element_text = null,
    metadata = {},
    is_new_session = false
  } = req.body || {};

  try {
    const [result] = await pool.query(
      `
        INSERT INTO Analytics (
          EventType,
          PagePath,
          EventName,
          ElementText,
          Metadata,
          IsNewSession,
          TrackedAt
        ) VALUES (?, ?, ?, ?, ?, ?, NOW())
      `,
      [event_type, page_path, event_name, element_text, JSON.stringify(metadata), is_new_session ? 1 : 0]
    );

    return res.status(201).json({ success: true, id: result.insertId });
  } catch (error) {
    console.error('Database write error:', error);
    return res.status(500).json({ error: 'Failed to record event' });
  }
});

router.get('/timeline', async (req, res) => {
  const days = parseInt(req.query.days) || 14;

  try {
    const [rows] = await pool.query(
      `
        SELECT DATE(TrackedAt) AS date, COUNT(*) AS total_events
        FROM Analytics
        WHERE TrackedAt >= DATE_SUB(NOW(), INTERVAL ? DAY)
        GROUP BY DATE(TrackedAt)
        ORDER BY date ASC
      `,
      [days]
    );
    return res.json(rows);
  } catch (error) {
    console.error('Database read error:', error);
    return res.status(500).json({ error: 'Failed to fetch timeline data' });
  }
});

router.get('/summary', async (req, res) => {
  const days = parseInt(req.query.days) || 14;

  try {
    const [timeline] = await pool.query(
      `
        SELECT DATE(TrackedAt) AS date,
               COUNT(*) AS total_events,
               SUM(CASE WHEN IsNewSession = 1 THEN 1 ELSE 0 END) AS new_sessions
        FROM Analytics
        WHERE TrackedAt >= DATE_SUB(NOW(), INTERVAL ? DAY)
        GROUP BY DATE(TrackedAt)
        ORDER BY date ASC
      `,
      [days]
    );

    const [totals] = await pool.query(
      `
        SELECT
          COUNT(*) AS total_events,
          SUM(CASE WHEN EventType = 'page_view' THEN 1 ELSE 0 END) AS page_views,
          SUM(CASE WHEN EventType = 'click' THEN 1 ELSE 0 END) AS clicks,
          SUM(CASE WHEN IsNewSession = 1 THEN 1 ELSE 0 END) AS new_sessions
        FROM Analytics
        WHERE TrackedAt >= DATE_SUB(NOW(), INTERVAL ? DAY)
      `,
      [days]
    );

    const [topPages] = await pool.query(
      `
        SELECT PagePath AS page_path, COUNT(*) AS count
        FROM Analytics
        WHERE EventType = 'page_view' AND TrackedAt >= DATE_SUB(NOW(), INTERVAL ? DAY)
        GROUP BY PagePath
        ORDER BY count DESC
        LIMIT 10
      `,
      [days]
    );

    const [topInteractions] = await pool.query(
      `
        SELECT COALESCE(ElementText, EventName, EventType) AS label,
               COUNT(*) AS count
        FROM Analytics
        WHERE EventType = 'click' AND TrackedAt >= DATE_SUB(NOW(), INTERVAL ? DAY)
        GROUP BY COALESCE(ElementText, EventName, EventType)
        ORDER BY count DESC
        LIMIT 10
      `,
      [days]
    );

    return res.json({
      totals: totals[0] || {},
      timeline,
      top_pages: topPages,
      top_interactions: topInteractions
    });
  } catch (error) {
    console.error('Database read error:', error);
    return res.status(500).json({ error: 'Failed to fetch analytics summary' });
  }
});

module.exports = router;
