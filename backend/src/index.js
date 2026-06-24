const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {app_port, app_protocol, app_host } = require('./config');
const dotenv = require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: [
        "http://localhost:3002",
        "https://charlese.website",
        "https://www.charlese.website"
    ]
}));
app.use(express.json());

// Route Groups
app.use("/auth", require("./routes/auth"));
app.use("/contact", require("./routes/contact"));
app.use("/admin", require("./routes/admin"));
app.use("/users", require("./routes/users"));
app.use("/jobs", require("./routes/jobs"));
app.use("/projects", require("./routes/projects"));
app.get("/health", (req, res) => {
    res.json({ status: "OK" });
});

app.listen(app_port, () => {
    console.log(`Server is running on port ${app_port}`);
});