require('dotenv').config();

const { PORT, DB_URI, JWT_SECRET } = process.env;

module.exports = {
    PORT: PORT || 5000,
    DB_URI,
    JWT_SECRET,
};