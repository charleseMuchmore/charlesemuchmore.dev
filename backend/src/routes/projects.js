const express = require("express");
const router = express.Router();
const pool = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT PID, Name, ShortDescription, FullDescription, TechStack, GitHubURL, LiveURL, ImageURL, Featured, CreatedAt FROM Projects ORDER BY PID DESC"
        );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch projects" });
    }
});

router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: "Invalid project id" });

    try {
        const [rows] = await pool.query(
            "SELECT PID, Name, ShortDescription, FullDescription, TechStack, GitHubURL, LiveURL, ImageURL, Featured, CreatedAt FROM Projects WHERE PID = ?",
            [id]
        );
        if (rows.length === 0) return res.status(404).json({ error: "Project not found" });
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch project" });
    }
});

router.post("/", authMiddleware, async (req, res) => {   
 const { name, shortDescription, fullDescription, techStack, gitHubURL, liveURL, imageURL, featured} = req.body;
    if (!name || !shortDescription) {
        return res.status(400).json({ error: "Missing project fields" });
    }

    try {
        const [result] = await pool.query(
            "INSERT INTO Projects (Name, ShortDescription, FullDescription, TechStack, GitHubURL, LiveURL, ImageURL, Featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [name, shortDescription, fullDescription, techStack, gitHubURL, liveURL, imageURL, featured]
        );
        const [rows] = await pool.query(
            "SELECT PID, Name, ShortDescription, FullDescription, TechStack, GitHubURL, LiveURL, ImageURL, Featured FROM Projects WHERE PID = ?",
            [result.insertId]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create project" });
    }
});

router.put("/:id", authMiddleware, async (req, res) => {
    const id = Number(req.params.id);
    const { name, shortDescription, fullDescription, techStack, githubURL, liveURL, imageURL, featured, createdAt } = req.body;
    if (!id) return res.status(400).json({ error: "Invalid project id" });
    if (!name || !shortDescription) {
        return res.status(400).json({ error: "Missing project title or description" });
    }

    try {
        const [result] = await pool.query(
            "UPDATE Projects SET Name = ?, ShortDescription = ?, FullDescription = ?, TechStack = ?, GitHubURL = ?, LiveURL = ?, ImageURL = ?, Featured = ?, CreatedAt = ? WHERE PID = ?",
            [name, shortDescription, fullDescription, techStack, githubURL, liveURL, imageURL, featured, createdAt, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: "Project not found" });
        const [rows] = await pool.query(
            "SELECT PID, Name, ShortDescription, FullDescription, TechStack, GitHubURL, LiveURL, ImageURL, Featured, CreatedAt FROM Projects WHERE PID = ?",
            [id]
        );
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update project" });
    }
});

router.delete("/:id", authMiddleware, async (req, res) => {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: "Invalid project id" });

    try {
        const [result] = await pool.query("DELETE FROM Projects WHERE PID = ?", [id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: "Project not found" });
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete project" });
    }
});

module.exports = router;