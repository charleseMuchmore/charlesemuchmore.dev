const { smtp_key, smtp_host, smtp_port, smtp_user } = require('./config');

const express = require('express');
const app = express();
const port = 3001;
const nodemailer = require("nodemailer");

const mailman = nodemailer.createTransport({
  host: smtp_host,
  port: smtp_port,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: smtp_user,
    pass: smtp_key,
  },
});

let email = async () => {
  // send mail with defined transport object
  const info = await mailman.sendMail({
    from: 'she.charlesemuchmore.dev', // sender address
    to: "charlymuchmore@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@charlesemuchmore.dev>
}

email().catch(console.error);

  


app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

