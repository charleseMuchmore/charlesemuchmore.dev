const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    app_port: process.env.PORT,
    app_protocol: process.env.PROTOCOL,
    app_host: process.env.HOST,
    smtp_host: process.env.SMTP_HOST,
    smtp_port: process.env.SMTP_PORT,
    smtp_user: process.env.SMTP_USER,
    smtp_pass: process.env.SMTP_PASS
};
