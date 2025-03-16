
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config()


const authMiddleware = async (req, res, next) => {
    try {
        // Get token from headers
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'Access Denied. No token provided.' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find user by ID
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'Invalid token. User not found.' });
        }

        // Attach user to request object (excluding password)
        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized. Invalid or expired token.' });
    }
};

export default authMiddleware;
