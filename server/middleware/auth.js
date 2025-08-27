const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const token = req.header('auth-token');
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (verified.role !== 'admin') {
      return res.status(401).json({ error: 'Admin access required' });
    }
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};