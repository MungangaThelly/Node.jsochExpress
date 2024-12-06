// middleware/auth.js 
const jwt = require('jsonwebtoken'); 
const authenticate = (req, res, next) => { 
    const token = req.headers['Authorization']?.split(' '); // Hämtar token från "Authorization" headern

    if (!token) {
        return res.status(403).json({ message: 'Access denied. No token provided.' }); 
    } 
    
    try { 
        const verified = jwt.verify(token, process.env.JWT_SECRET); 
        req.user = verified; 
        next(); 
    } catch (error) { 
        res.status(400).json({ message: 'Invalid token' }); 
    } 
}; 

module.exports = authenticate;