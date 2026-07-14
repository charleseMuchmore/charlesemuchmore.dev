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
            "SELECT JID, Title, JoyDate, ShortDescription, FullDescription, ImageURL, CreatedAt FROM Joys ORDER BY JID DESC"
        );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch joys" });
    }
});

router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: "Invalid joy id" });

    try {
        const [rows] = await pool.query(
            "SELECT JID, Title, JoyDate, ShortDescription, FullDescription, ImageURL, CreatedAt FROM Joys WHERE JID = ?",
            [id]
        );
        if (rows.length === 0) return res.status(404).json({ error: "Joy not found" });
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch joy" });
    }
});

router.post("/", authMiddleware, async (req, res) => {   
 const { title, joyDate, shortDescription, fullDescription, imageURL} = req.body;
    if (!title) {
        return res.status(400).json({ error: "Missing joy fields" });
    }

    try {
        const [result] = await pool.query(
            "INSERT INTO Joys (Title, JoyDate, ShortDescription, FullDescription, ImageURL) VALUES (?, ?, ?, ?, ?)",
            [title, joyDate, shortDescription, fullDescription, imageURL]
        );
        const [rows] = await pool.query(
            "SELECT JID, Title, JoyDate, ShortDescription, FullDescription, ImageURL, CreatedAt FROM Joys WHERE JID = ?",
            [result.insertId]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create joy" });
    }
});

router.put("/:id", authMiddleware, async (req, res) => {
    const id = Number(req.params.id);
    const { title, joyDate, shortDescription, fullDescription, imageURL, createdAt } = req.body;
    if (!id) return res.status(400).json({ error: "Invalid joy id" });
    if (!title) {
        return res.status(400).json({ error: "Missing joy title or description" });
    }

    try {
        const [result] = await pool.query(
            "UPDATE Joys SET Title = ?, JoyDate = ?, ShortDescription = ?, FullDescription = ?, ImageURL = ?,  CreatedAt = ? WHERE JID = ?",
            [title, joyDate, shortDescription, fullDescription, imageURL, createdAt, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: "Joy not found" });
        const [rows] = await pool.query(
            "SELECT JID, Title, JoyDate, ShortDescription, FullDescription, ImageURL, CreatedAt FROM Joys WHERE JID = ?",
            [id]
        );
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update joy" });
    }
});

router.post("/", authMiddleware, async (req, res) => {   
 const { title, joyDate, shortDescription, fullDescription, imageURL} = req.body;
    if (!title) {
        return res.status(400).json({ error: "Missing joy fields" });
    }

    try {
        const [result] = await pool.query(
            "INSERT INTO Joys (Title, JoyDate, ShortDescription, FullDescription, ImageURL) VALUES (?, ?, ?, ?, ?)",
            [title, joyDate, shortDescription, fullDescription, imageURL]
        );
        const [rows] = await pool.query(
            "SELECT JID, Title, JoyDate, ShortDescription, FullDescription, ImageURL, CreatedAt FROM Joys WHERE JID = ?",
            [result.insertId]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create joy" });
    }
});

router.put("/:id", authMiddleware, async (req, res) => {
    const id = Number(req.params.id);
    const { title, joyDate, shortDescription, fullDescription, imageURL, createdAt } = req.body;
    if (!id) return res.status(400).json({ error: "Invalid joy id" });
    if (!title) {
        return res.status(400).json({ error: "Missing joy title or description" });
    }

    try {
        const [result] = await pool.query(
            "UPDATE Joys SET Title = ?, JoyDate = ?, ShortDescription = ?, FullDescription = ?, ImageURL = ?,  CreatedAt = ? WHERE JID = ?",
            [title, joyDate, shortDescription, fullDescription, imageURL, createdAt, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: "Joy not found" });
        const [rows] = await pool.query(
            "SELECT JID, Title, JoyDate, ShortDescription, FullDescription, ImageURL, CreatedAt FROM Joys WHERE JID = ?",
            [id]
        );
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update joy" });
    }
});