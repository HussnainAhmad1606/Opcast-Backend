const asyncWrapper = require("../../middleware/async");
const bcrypt = require('bcrypt');

const User = require('../../models/User');
const { signToken } = require('../../utils/jwt');
const login = asyncWrapper(async (req, res) => {
    if (req.method == "POST") {
        const rUsername = req.body.username;
        const rPassword = req.body.password;
        let user =  await User.findOne({username: rUsername})
        console.log(user)

        if (user && (await bcrypt.compare(rPassword, user.password))) {
     

            const token = signToken({ username: user.username }, process.env.JWT_TOKEN, '5h');
            const refreshToken = signToken({ username: user.username }, process.env.JWT_REFRESH_TOKEN, '7d');
          
            res.status(200).json({ type: "success", message: "Logged in Sucess", token: token, refreshToken: refreshToken, userId: user._id });

        }
        else {
            return res.status(400).json({message: "Invalid Credientails", type: "error"})
        }

    }
    
    else {
        return res.status(200).json({ error: "Not Allowed" })
    }
})
module.exports = login;