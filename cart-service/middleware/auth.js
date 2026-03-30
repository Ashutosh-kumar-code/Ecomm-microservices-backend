const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'No token provided. Please log in.' });
  }

  // Extract token from "Bearer <token>" format
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_super_secret_jwt_key_change_this_in_production');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token. Please log in again.' });
  }
};
