const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'No authorization token, access denied.' });
  }

  const token = authHeader.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ success: false, message: 'Invalid token format, access denied.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'lumina_secret_key');
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Token verification failed, authorization denied.' });
  }
};

module.exports = authMiddleware;
