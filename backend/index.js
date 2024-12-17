const { smtp_key, smtp_host, smtp_port, smtp_user } = require('./config');

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

//middleware
app.use(cors());
app.use(bodyParser.json());


// Route to send emails
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;
    
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: smtp_user,
            pass: smtp_key
        }
    });

    // Email options
    const mailOptions = {
        from: email, // Sender's email
        to: smtp_user, // Replace with your email
        subject: 'New Contact Form Submission',
        text: `You have a new message from ${name} (${email}):\n\n${message}`,
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


// // const mailman = nodemailer.createTransport({
// //   host: smtp_host,
// //   port: smtp_port,
// //   secure: true, // true for port 465, false for other ports
// //   auth: {
// //     user: smtp_user,
// //     pass: smtp_key,
// //   },
// // });

// // let email = async () => {
// //   // send mail with defined transport object
// //   const info = await mailman.sendMail({
// //     from: 'charlymuchmore@gmail.com', // sender address
// //     to: "she@charlesemuchmore.dev", // list of receivers
// //     subject: "Hello ✔", // Subject line
// //     text: "Hello world?", // plain text body
// //     html: "<b>Hello world?</b>", // html body
// //   });

// //   console.log("Message sent: %s", info.messageId);
// //   // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@charlesemuchmore.dev>
// // }

// email().catch(console.error);

  


// app.get('/', (req, res) => {
//     res.send('Hello from the backend!');
// });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

