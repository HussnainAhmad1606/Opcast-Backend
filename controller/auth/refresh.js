const asyncWrapper = require("../../middleware/async");
const { verifyToken } = require('../../utils/jwt');
const refresh = asyncWrapper(async (req, res) => {
  const SECRET_KEY = process.env.JWT_TOKEN;
const REFRESH_SECRET_KEY = process.env.JWT_REFRESH_TOKEN;
    if (req.method !== 'POST') {
        return res.status(405).end(); 
      }
    
      const { refreshToken } = req.body;
    
      if (!refreshToken) {
        return res.status(401).json({ type: "error" , message: 'No refresh token provided' });
      }
    
      try {
        const decoded = verifyToken(refreshToken, REFRESH_SECRET_KEY);
        const newToken = signToken({ username: decoded.username }, SECRET_KEY, '5h');
    
        res.status(200).json({ type: "success", message: "Token Refreshed", token: newToken });
      } catch (error) {
        return res.status(401).json({ type: "error", message: 'Invalid refresh token' });
      }
})
module.exports = refresh;