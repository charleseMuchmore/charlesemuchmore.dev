const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({ status: "OK" })
});

router.post("/", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "Missing fields"});
    };

    try {
        await sendContactEmail({ name, email, message });
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to send message"});
    };
});

module.exports = router;