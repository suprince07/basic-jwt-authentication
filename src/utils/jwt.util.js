const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_LIFE })
}

const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_LIFE })
}

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    return {
      data: decoded,
    };
  } catch (e) {
    return {
      error: e.toString(),
    };
  }
}

const verifyRefreshToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    return {
      data: decoded,
    };
  } catch (e) {
    return {
      error: e.toString(),
    };
  }
};

module.exports = {
  generateToken,
  generateRefreshToken,
  verifyToken,
  verifyRefreshToken
}