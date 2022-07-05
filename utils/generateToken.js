const jwt = require('jsonwebtoken')

const generateToken = (payload) => {
    return jwt.sign({ userId: payload }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EPIRATION,
      });
}

module.exports = generateToken