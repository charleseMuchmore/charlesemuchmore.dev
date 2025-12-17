const express = require("express");
const router = express.Router();

router.get("/jobs", (req, res) => {
    res.json({ status: "OK" })
});

module.exports = router;