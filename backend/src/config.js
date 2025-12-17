const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    app_port: process.env.PORT,
    app_protocol: process.env.PROTOCOL,
    app_host: process.env.HOST,
    smtp_host: process.env.SMTP_HOST,
    smtp_port: process.env.SMTP_PORT,
    smtp_user: process.env.SMTP_USER,
    smtp_pass: process.env.SMTP_PASS,
    db_host: process.env.DB_HOST,
    db_name: process.env.DB_NAME,
    db_user: process.env.DB_USER,
    db_pass: process.env.DB_PASS
};
