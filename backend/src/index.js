const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {app_port, app_protocol, app_host } = require('./config');

const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002",
        "https://charlesemuchmore.dev"
    ]
}));
app.use(express.json());

// Route Groups
app.use("/auth", require("./routes/auth"));
app.use("/contact", require("./routes/contact"));

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

// //email transporter setup
// const transporter = nodemailer.createTransport({
//     host: smtp_host,
//     port: smtp_port,
//     auth: {
//         type: "login",
//         user: smtp_user,
//         pass: smtp_key
//     }
// });

// // verify transport server connection configuration
// transporter.verify(function (error, success) {
//     if (error) {
//     console.log(error);
//     } else {
//     console.log("Email transporter is ready for duty");
//     }
// });

// //handle emails
// app.post('/send-email', (req, res) => {
//     const { name, email, message } = req.body;

//     // Email options
//     const mailOptions = {
//         from: {
//             name: req.body.name,
//             address: smtp_user,
//           }, // Sender's email
//         to: smtp_user, // Replace with your email
//         subject: `NEW Contact Form Submission (${name})`,
//         text: `You have a new message from ${name} (${email}):\n\n${message}`,
//         replyTo: email,
//     };
     
    
//     // Send the email
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.error('Error sending email:', error);
//             return res.status(500).json({message: 'Failed to send email.'});
//         } else if (info) {
//             console.log("Email sent: ", info);
//             res.status(200).json({message: 'Email sent successfully!'});
//         } else {
//             res.status(100).json({message: "Failed to send email, no further information available."});
//         }
//     });

// });

app.listen(app_port, () => {
    console.log(`Server is running on port ${app_port}`);
});


