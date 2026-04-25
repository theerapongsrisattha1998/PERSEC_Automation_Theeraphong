const path = require('path');
const dotenv = require('dotenv');

const envFile = process.env.ENV_FILE || '.env.prod';
dotenv.config({ path: path.join(__dirname, '..', envFile) }); 


module.exports = {
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    email: process.env.EMAIL,
};