import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export const protect = async (req, res, next) => {
  try {
    // Get token from httpOnly cookie or Authorization header
    let token = req.cookies?.adminToken;
    
    if (!token && req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = await Admin.findById(decoded.id).select('-password');
    req.user = req.admin; // Add user for compatibility
    
    if (!req.admin) {
      return res.status(401).json({ message: 'Admin not found' });
    }

    next();
  } catch (error) {
    console.error('Auth Error:', error.message);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token format' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    res.status(401).json({ message: 'Not authorized' });
  }
};

// Optional auth - doesn't fail if no token
export const optionalAuth = async (req, res, next) => {
  try {
    let token = req.cookies?.adminToken;
    
    if (!token && req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.admin = await Admin.findById(decoded.id).select('-password');
      req.user = req.admin;
    }
    
    next();
  } catch (error) {
    // Continue without auth
    next();
  }
};
