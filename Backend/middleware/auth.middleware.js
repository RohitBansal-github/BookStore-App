import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      console.log("Authorization Header in protect middleware:", req.headers.authorization);
    }

    if (!token) {
      console.log("No token found in protect middleware.");
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token in protect middleware:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Error in protect middleware:', error);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

export const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};