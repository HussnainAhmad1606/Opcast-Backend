const asyncWrapper = require("../../middleware/async");
const User = require('../../models/User');
const { verifyToken } = require('../../utils/jwt');
const verify = asyncWrapper(async (req, res) => {
    if (req.method == "POST") {

        const verification = verifyToken(req.body.token, process.env.JWT_TOKEN);
        if (!verification) {
            return res.status(200).json({ type: "error", message: "Invalid Token" })
        }
        const user = await User.findOne({ username: verification.username }, { password: 0, createdAt: 0, updatedAt: 0, __v: 0 });
      
        res.status(200).json({ type: "success", message: "Logged in Sucess", user: user});

    }
    
    else {
        return res.status(200).json({ error: "Not Allowed" })
    }
})
module.exports = verify;