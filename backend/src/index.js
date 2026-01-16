const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {app_port, app_protocol, app_host } = require('./config');

const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: [
        "http://localhost:3002",
        "https://charlesemuchmore.dev"
    ]
}));
app.use(express.json());

// Route Groups
app.use("/auth", require("./routes/auth"));
app.use("/contact", require("./routes/contact"));
app.use("/admin", require("./routes/admin"));
// app.use("/login", require("./routes/auth"));
// app.use("/dashboard", require("./routes/admin"));

app.get("/health", (req, res) => {
    res.json({ status: "OK" });
});

// //middleware
// let url = `${app_protocol}://${app_host}:${app_port}`
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', url); // Or '*' for all origins
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); 
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
//   });

app.listen(app_port, () => {
    console.log(`Server is running on port ${app_port}`);
});


