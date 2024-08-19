const jwt = require('jsonwebtoken');
const CustomErrorApi = require('../errors/custom-error')

const authentication = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ type: "error", message: 'Invalid Bearer' })
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        const { userId, username } = decoded
        console.log(decoded)
        req.user = {  userId, username }
    } catch (err) {
        return res.status(401).json({ type: "error", message:"Not authorized to access this route" })
    }
    next();
}

module.exports = authentication;