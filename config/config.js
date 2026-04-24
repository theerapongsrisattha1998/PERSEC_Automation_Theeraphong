const path = require('path');
const dotenv = require('dotenv');

const envFile = process.env.ENV_FILE || '.env.prod';
dotenv.config({ path: path.join(__dirname, '..', envFile) }); 


module.exports = {
    loginUrl: process.env.LOGIN_URL,
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    errorNoticeMsg: process.env.ERROR_NOTICE_MESSAGE,
    errorUserMsg: process.env.ERROR_USER_MESSAGE,
    errorPassMsg: process.env.ERROR_PASS_MESSAGE,
    email: process.env.EMAIL
};