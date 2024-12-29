const { smtp_key, smtp_host, smtp_port, smtp_user, app_port } = require('./config');

//app setup
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = app_port;

//middleware
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Or '*' for all origins
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
app.use(bodyParser.json());

//email transporter setup
const transporter = nodemailer.createTransport({
    host: smtp_host,
    port: smtp_port,
    auth: {
        type: "login",
        user: smtp_user,
        pass: smtp_key
    }
});

// verify transport server connection configuration
transporter.verify(function (error, success) {
    if (error) {
    console.log(error);
    } else {
    console.log("Email transporter is ready for duty");
    }
});

//handle emails
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // Email options
    const mailOptions = {
        from: {
            name: req.body.name,
            address: smtp_user,
          }, // Sender's email
        to: smtp_user, // Replace with your email
        subject: `NEW Contact Form Submission (${name})`,
        text: `You have a new message from ${name} (${email}):\n\n${message}`,
        replyTo: email,
    };
      
    
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({message: 'Failed to send email.'});
        }
        res,status(200),json({message: 'Email sent successfully!'});
    });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

