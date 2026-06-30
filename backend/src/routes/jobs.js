const express = require("express");
const router = express.Router();
const pool = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

//tested - OK
router.get("/", async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT JID, Title, Company, Location, StartDate, EndDate, CurrentJob, Description, CreatedAt FROM Jobs ORDER BY JID DESC"
        );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch jobs" });
    }
});

router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: "Invalid job id" });

    try {
        const [rows] = await pool.query(
            "SELECT JID, Title, Company, Location, StartDate, EndDate, CurrentJob, Description, CreatedAt FROM Jobs WHERE JID = ?",
            [id]
        );
        if (rows.length === 0) return res.status(404).json({ error: "Job not found" });
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch job" });
    }
});

router.post("/", authMiddleware, async (req, res) => {
    const { title, company, location, startDate, endDate, currentJob, description } = req.body;
    if (!title || !company || !location || !startDate || !endDate || !currentJob || !description) {
        return res.status(400).json({ error: "Missing job fields" });
    }

    try {
        const [result] = await pool.query(
            "INSERT INTO Jobs (Title, Company, Location, StartDate, EndDate, CurrentJob, Description) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [title, company, location, startDate, endDate, currentJob, description]
        );
        const [rows] = await pool.query(
            "SELECT JID, Title, Company, Location, StartDate, EndDate, CurrentJob, Description, CreatedAt FROM Jobs WHERE JID = ?",
            [result.insertId]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create job" });
    }
});

router.put("/:id", authMiddleware, async (req, res) => {
    const id = Number(req.params.id);
    const { title, company, location, startDate, endDate, currentJob, description } = req.body;
    if (!id) return res.status(400).json({ error: "Invalid job id" });
    if (!title || !company || !location || !description) {
        return res.status(400).json({ error: "Missing job fields" });
    }

    try {
        const [result] = await pool.query(
            "UPDATE Jobs SET Title = ?, Company = ?, Location = ?, StartDate = ?, EndDate = ?, CurrentJob = ?, Description = ? WHERE JID = ?",
            [title, company, location, startDate, endDate, currentJob, description, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: "Job not found" });
        const [rows] = await pool.query(
            "SELECT JID, Title, Company, Location, StartDate, EndDate, CurrentJob, Description FROM Jobs WHERE JID = ?",
            [id]
        );
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update job" });
    }
});

router.delete("/:id", authMiddleware, async (req, res) => {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: "Invalid job id" });

    try {
        const [result] = await pool.query("DELETE FROM Jobs WHERE JID = ?", [id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: "Job not found" });
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete job" });
    }
});

module.exports = router;