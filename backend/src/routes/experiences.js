const express = require("express");
const router = express.Router();
const pool = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

//tested - OK
router.get("/", async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT XID, Title, Company, Location, StartDate, EndDate, CurrentJob, Description, CreatedAt FROM Experiences ORDER BY XID DESC"
        );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch experiences" });
    }
});

router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: "Invalid experience id" });

    try {
        const [rows] = await pool.query(
            "SELECT XID, Title, Company, Location, StartDate, EndDate, CurrentJob, Description, CreatedAt FROM Experiences WHERE XID = ?",
            [id]
        );
        if (rows.length === 0) return res.status(404).json({ error: "Experience not found" });
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch experience" });
    }
});

router.post("/", authMiddleware, async (req, res) => {
    const { title, company, location, startDate, endDate, currentJob, description } = req.body;
    if (!title || !company || !location || !startDate || !endDate || !currentJob || !description) {
        return res.status(400).json({ error: "Missing experience fields" });
    }

    try {
        const [result] = await pool.query(
            "INSERT INTO Experiences (Title, Company, Location, StartDate, EndDate, CurrentJob, Description) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [title, company, location, startDate, endDate, currentJob, description]
        );
        const [rows] = await pool.query(
            "SELECT XID, Title, Company, Location, StartDate, EndDate, CurrentJob, Description, CreatedAt FROM Experiences WHERE XID = ?",
            [result.insertId]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create experience" });
    }
});

router.put("/:id", authMiddleware, async (req, res) => {
    const id = Number(req.params.id);
    const { title, company, location, startDate, endDate, currentJob, description } = req.body;
    if (!id) return res.status(400).json({ error: "Invalid experience id" });
    if (!title || !company || !location || !description) {
        return res.status(400).json({ error: "Missing experience fields" });
    }

    try {
        const [result] = await pool.query(
            "UPDATE Experiences SET Title = ?, Company = ?, Location = ?, StartDate = ?, EndDate = ?, CurrentJob = ?, Description = ? WHERE XID = ?",
            [title, company, location, startDate, endDate, currentJob, description, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: "Experience not found" });
        const [rows] = await pool.query(
            "SELECT XID, Title, Company, Location, StartDate, EndDate, CurrentJob, Description, CreatedAt FROM Experiences WHERE XID = ?",
            [id]
        );
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update experience" });
    }
});

router.delete("/:id", authMiddleware, async (req, res) => {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: "Invalid experience id" });

    try {
        const [result] = await pool.query("DELETE FROM Experiences WHERE XID = ?", [id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: "Experience not found" });
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete experience" });
    }
});

module.exports = router;