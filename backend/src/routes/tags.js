const express = require("express");
const router = express.Router();
const pool = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

const express = require("express");
const router = express.Router();
const pool = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT TID, Name, Description, CreatedAt FROM Tags ORDER BY TID DESC"
        );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch tags" });
    }
});

router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: "Invalid tag id" });

    try {
        const [rows] = await pool.query(
            "SELECT TID, Name, Description, CreatedAt FROM Tags WHERE TID = ?",
            [id]
        );
        if (rows.length === 0) return res.status(404).json({ error: "Tag not found" });
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch tag" });
    }
});

router.post("/", authMiddleware, async (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(400).json({ error: "Missing tag fields" });
    }

    try {
        const [result] = await pool.query(
            "INSERT INTO Tags (Name, Description) VALUES (?, ?)",
            [name, description]
        );
        const [rows] = await pool.query(
            "SELECT TID, Name, Description, CreatedAt FROM Tags WHERE TID = ?",
            [result.insertId]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create tag" });
    }
});

router.put("/:id", authMiddleware, async (req, res) => {
    const id = Number(req.params.id);
    const { name, description } = req.body;
    if (!id) return res.status(400).json({ error: "Invalid tag id" });
    if (!name || !description) {
        return res.status(400).json({ error: "Missing tag fields" });
    }

    try {
        const [result] = await pool.query(
            "UPDATE Tags SET Name = ?, Description = ? WHERE TID = ?",
            [name, description, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: "Tag not found" });
        const [rows] = await pool.query(
            "SELECT TID, Name, Description, CreatedAt FROM Tags WHERE TID = ?",
            [id]
        );
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update tag" });
    }
});

router.delete("/:id", authMiddleware, async (req, res) => {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: "Invalid tag id" });

    try {
        const [result] = await pool.query("DELETE FROM Tags WHERE TID = ?", [id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: "Tag not found" });
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete tag" });
    }
});
module.exports = router;