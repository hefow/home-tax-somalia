import jwt from 'jsonwebtoken';
import User from '../models/Users.js';

export const protect = async (req, res, next) => {
  try {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const activeRoutes = ['/api/users/profile', '/api/properties', '/api/activities'];
    if (activeRoutes.some(route => req.path.includes(route))) {
      user.lastActivity = new Date();
      await user.save();
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth Error:', error);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};
