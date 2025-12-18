require('dotenv').config();

const { PORT, DB_URI, JWT_SECRET } = process.env;

export default {
    PORT: PORT || 5000,
    DB_URI,
    JWT_SECRET,
};