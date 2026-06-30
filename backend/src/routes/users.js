const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT UID, Username FROM Users ORDER BY UID DESC");
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

router.get("/:id", authMiddleware, async (req, res) => {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: "Invalid user id" });

    try {
        const [rows] = await pool.query("SELECT UID, Username FROM Users WHERE UID = ?", [id]);
        if (rows.length === 0) return res.status(404).json({ error: "User not found" });
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch user" });
    }
});

router.post("/", authMiddleware, async (req, res) => {
    const { username, password, role } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: "Missing username or password" });
    }

    try {
        const hash = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            "INSERT INTO Users (Username, Password) VALUES (?, ?)",
            [username, hash]
        );
        const [rows] = await pool.query("SELECT UID, Username FROM Users WHERE UID = ?", [result.insertId]);
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create user" });
    }
});

router.put("/:id", authMiddleware, async (req, res) => {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: "Invalid user id" });

    const { username, password } = req.body;
    if (!username && !password) {
        return res.status(400).json({ error: "No user fields to update" });
    }

    try {
        const fields = [];
        const values = [];

        if (username) {
            fields.push("Username = ?");
            values.push(username);
        }
        if (password) {
            const hash = await bcrypt.hash(password, 10);
            fields.push("Password = ?");
            values.push(hash);
        }
        values.push(id);

        const [result] = await pool.query(
            `UPDATE Users SET ${fields.join(", ")} WHERE UID = ?`,
            values
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: "User not found" });

        const [rows] = await pool.query("SELECT UID, Username FROM Users WHERE UID = ?", [id]);
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update user" });
    }
});

router.delete("/:id", authMiddleware, async (req, res) => {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: "Invalid user id" });

    try {
        const [result] = await pool.query("DELETE FROM Users WHERE UID = ?", [id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: "User not found" });
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete user" });
    }
});

module.exports = router;