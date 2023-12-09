const jwt = require('jsonwebtoken');
const config = require('./config');

function authenticateMiddleware(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, config.secretKey);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}
module.exports = authenticateMiddleware;
