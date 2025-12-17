const mailer = require('../services/mailer.js');
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({ status: "OK" })
});

router.post("/", async (req, res) => {
    const { name, email, message } = req.body;

    console.log(req.body);
    if (!name || !email || !message) {
        return res.status(400).json({ error: "Missing fields"});
    };

    try {
        await mailer.sendContactEmail({ name, email, message });
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to send message"});
    };
});

module.exports = router;