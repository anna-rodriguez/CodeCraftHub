import pkg from 'jsonwebtoken';
const { verify } = pkg;
import User from '../models/userModel.js';

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        if (!req.user) {
            return res.status(401).json({ message: 'Invalid token.' });
        }
        next();
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token.' });
    }
};

export default authMiddleware;