const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    smtp_host: process.env.SMTP_HOST,
    smtp_key: process.env.SMTP_PASS,
    smtp_port: process.env.SMTP_PORT,
    smtp_user: process.env.SMTP_USER,
    app_port: process.env.APP_PORT
};