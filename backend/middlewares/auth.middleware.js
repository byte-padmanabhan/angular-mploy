// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'my-secret-key';

// This function checks if user is authenticated
const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access denied. No token provided.' 
      });
    }
    

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access denied. Invalid token format.' 
      });
    }
    
    const verified = jwt.verify(token, SECRET_KEY);
    
    req.user = verified; // Now route handlers can access req.user
    
    next();
    
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token.' 
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Token expired. Please login again.' 
      });
    }
    
    return res.status(401).json({ 
      success: false, 
      message: 'Authentication failed.' 
    });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    // Check if user exists (from authenticate middleware)
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Not authenticated' 
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: `Access denied. ${req.user.role} role cannot access this resource.` 
      });
    }
    
    next();
  };
};

module.exports = { authenticate, authorize };