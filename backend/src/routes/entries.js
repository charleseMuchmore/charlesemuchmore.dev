const express = require("express");
const router = express.Router();
const pool = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT EID, Title, Description, Body, RelatedLinks, CreatedAt FROM Entries ORDER BY EID DESC"
        );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch entries" });
    }
});

router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: "Invalid entry id" });

    try {
        const [rows] = await pool.query(
            "SELECT EID, Title, Description, Body, RelatedLinks, CreatedAt FROM Entries WHERE EID = ?",
            [id]
        );
        if (rows.length === 0) return res.status(404).json({ error: "Entry not found" });
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch entry" });
    }
});

router.post("/", authMiddleware, async (req, res) => {   
 const { title, description, body, relatedLinks } = req.body;
    if (!title || !description) {
        return res.status(400).json({ error: "Missing entry fields" });
    }

    try {
        const [result] = await pool.query(
            "INSERT INTO Entries (Title, Description, Body, RelatedLinks) VALUES (?, ?, ?, ?)",
            [title, description, body, relatedLinks]
        );
        const [rows] = await pool.query(
            "SELECT EID, Title, Description, Body, RelatedLinks, CreatedAt FROM Entries WHERE EID = ?",
            [result.insertId]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create entry" });
    }
});

router.put("/:id", authMiddleware, async (req, res) => {
    const id = Number(req.params.id);
    const { title, description, body, relatedLinks } = req.body;
    if (!id) return res.status(400).json({ error: "Invalid entry id" });
    if (!title || !description) {
        return res.status(400).json({ error: "Missing entry title or description" });
    }

    try {
        const [result] = await pool.query(
            "UPDATE Entries SET Title = ?, Description = ?, Body = ?, RelatedLinks = ? WHERE EID = ?",
            [title, description, body, relatedLinks, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: "Entry not found" });
        const [rows] = await pool.query(
            "SELECT EID, Title, Description, Body, RelatedLinks, CreatedAt FROM Entries WHERE EID = ?",
            [id]
        );
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update entry" });
    }
});

router.delete("/:id", authMiddleware, async (req, res) => {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: "Invalid entry id" });

    try {
        const [result] = await pool.query("DELETE FROM Entries WHERE EID = ?", [id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: "Entry not found" });
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete entry" });
    }
});

module.exports = router;