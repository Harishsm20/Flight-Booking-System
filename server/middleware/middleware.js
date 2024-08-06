// middleware.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.session.token;
  if (!token) return res.status(401).json({ message: 'Access token required' });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired access token' });
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
