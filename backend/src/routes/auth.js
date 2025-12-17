const express = require("express");
const router = express.Router();

router.get("/auth", (req, res) => {
    res.json({ status: "OK" })
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password)
        return res.status(400).json({ error: "Missing fields" });

    try {
        const [rows] = await pool.query(
            "SELECT * FROM USERS WHERE username =?",
            [username]
        );

        if (rows.length === 0)
            return res.status(401).json({ error: "Invalid credentials" });

        const user = rows[0];

        // If you store plain passwords (not recommended):
        // if (user.password !== password)
        //     return res.status(401).json({ error: "Invalid credentials" });

        // If you use bcrypt:
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ error: "Invalid credentials" });

        res.json({ success: true, user: { id: user.id, username: user.username } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;