const nodemailer = require("nodemailer");
const config = require("../config");

const transporter = nodemailer.createTransport({
    host: config.smtp_host,
    port: config.smtp_port,
    auth: {
        type: "login",
        user: config.smtp_user,
        pass: config.smtp_pass
    },
});

async function sendContactEmail({ name, email, message }) {
    return transporter.sendMail({
        from: `"Contact Form" <${config.smtp_user}>`,
        to: config.smtp_user,
        replyTo: email,
        subject: `New message from ${name}`,
        text: message
    })
}

module.exports = {
    sendContactEmail,
};