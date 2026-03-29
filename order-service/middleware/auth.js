const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    console.log('Auth middleware - Received token:', token ? token.substring(0, 20) + '...' : 'none');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token, authorization denied',
        code: 'NO_TOKEN'
      });
    }

    // Check if token is expired and give clear error message
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_super_secret_jwt_key_change_this_in_production');
    
    // Check if token will expire within next 5 minutes
    const now = Math.floor(Date.now() / 1000);
    const timeUntilExpiry = decoded.exp - now;
    
    if (timeUntilExpiry < 300) { // 5 minutes = 300 seconds
      console.log('Token will expire soon, time left:', timeUntilExpiry, 'seconds');
      return res.status(401).json({
        success: false,
        message: `Token will expire in ${Math.ceil(timeUntilExpiry / 60)} minutes. Please refresh your session.`,
        code: 'TOKEN_EXPIRING_SOON'
      });
    }
    
    console.log('Auth middleware - Token decoded successfully:', decoded);
    req.userId = decoded.userId;
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    
    let errorMessage = 'Token is not valid';
    let errorCode = 'INVALID_TOKEN';
    
    if (error.name === 'TokenExpiredError') {
      errorMessage = 'Your session has expired. Please login again.';
      errorCode = 'TOKEN_EXPIRED';
    } else if (error.name === 'JsonWebTokenError') {
      errorMessage = 'Invalid token format. Please login again.';
    }
    
    res.status(401).json({
      success: false,
      message: errorMessage,
      code: errorCode
    });
  }
};

module.exports = authMiddleware;
