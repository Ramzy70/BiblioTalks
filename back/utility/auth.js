const jwt = require('jsonwebtoken');
const config = require('./config');
const blacklist = require('./blacklist');

function authenticateMiddleware(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - No token provided' });
  }

  try {
    // Check if the token is blacklisted
    if (blacklist.includes(token)) {
      return res.status(401).json({ error: 'Unauthorized - Token blacklisted' });
    }

    const decoded = jwt.verify(token, config.secretKey);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error('Error verifying token:', error.message);
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
}

module.exports = authenticateMiddleware;
