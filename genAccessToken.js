require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = function generateAccessToken(deviceId, expiresIn = '3d') {
    return jwt.sign({ deviceId }, process.env.TOKEN_KEY, { expiresIn });
}