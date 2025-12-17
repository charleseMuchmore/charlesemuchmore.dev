const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");


// Ensuring all passwords in DB are hashed with bcrypt... this also is some good code to reuse for password reset functionality
// (async () => {
//     const [users] = await pool.query("SELECT UID, Password FROM Users");

//     for (const user of users) {
//         const hash = await bcrypt.hash(user.Password, 10);
//         await pool.query(
//             "UPDATE Users SET Password = ? WHERE UID = ?",
//             [hash, user.UID]
//         );
//     }

//     console.log("Password migration complete.");
//     process.exit();
// })();

router.get("/login", (req, res) => {
    res.json({ status: "OK" })
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password)
        return res.status(400).json({ error: "Missing fields" });

    try {
        const [rows] = await pool.query(
            "SELECT * FROM Users WHERE Username =?",
            [username]
        );

        if (rows.length === 0)
            return res.status(401).json({ error: "Invalid credentials" });

        const user = rows[0];

        // If you store plain passwords (not recommended):
        // if (user.password !== password)
        //     return res.status(401).json({ error: "Invalid credentials" });

        // If you use bcrypt:
        const match = await bcrypt.compare(password, user.Password);
        if (!match) return res.status(401).json({ error: "Invalid credentials" });

        res.json({ success: true, user: { id: user.UID, username: user.Username } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

//untested - need to add error handling
router.post("reset-password", async (req, res) => {
    const user = await pool.query("SELECT UID, Password FROM Users WHERE Username = ?" [req.username]);

    const hash = await bcrypt.hash(req.password, 10);
        await pool.query(
            "UPDATE Users SET Password = ? WHERE UID = ?",
            [hash, user.UID]
        );

    console.log("Password update complete.");
})

module.exports = router;