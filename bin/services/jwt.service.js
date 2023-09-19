const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_KEY

function generateJwtToken(payload) {
    return jwt.sign(payload, jwtSecret, { expiresIn: '1d' });
}

function authenticateJwtToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decodedToken = jwt.verify(token, jwtSecret);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('Error verifying JWT token:', error);
        return res.status(403).json({ message: 'Forbidden' });
    }
}


module.exports = { generateJwtToken, authenticateJwtToken };