const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    app_port: process.env.PORT,
    app_protocol: process.env.PROTOCOL,
    app_host: process.env.HOST,
};
