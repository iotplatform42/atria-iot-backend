const generateAccessToken = require('./genAccessToken');
const verifyToken = require('./verify');

const token = generateAccessToken('AJ13234KLNADFA');
const decoded = verifyToken(token);

console.log(token)
console.log(decoded)
