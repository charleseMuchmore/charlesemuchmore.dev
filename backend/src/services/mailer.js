const nodemailer = require("nodemailer");
const config = require("../config");

const transporter = nodemailer.createTransport({
    host: "",
    port: "",
    secure: false,
    auth: {
        user: "",
        pass: ""
    },
});

async function sendContactEmail({ name, email, message }) {
    return transporter.sendMail({
        from: `"Contact Form" <${config.smtp_user}>`,
        to: config.contact_to,
        replyTo: email,
        subject: `New message from insert name here`,
        text: message
    })
}

module.exports = {
    sendContactEmail,
};