import JWTMethods from './utils/jwt.js';


const token = JWTMethods.generateToken({role: 'trainer'}, 'ROLE', '15m');
console.log(token)