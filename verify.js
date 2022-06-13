require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = token => jwt.verify(token, process.env.TOKEN_KEY)