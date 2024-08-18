const asyncWrapper = require("../../middleware/async");
const bcrypt = require("bcrypt");
const User = require('../../models/User');

const signup = asyncWrapper(async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    let userExists = await User.findOne({ username: req.body.username});

    if (userExists) {
      return res
        .status(200)
        .json({
          type: "error",
          message: "ERROR: User already exists",
        });
    }

    let user = new User({
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
    });

    await user.save();
    return res
      .status(200)
      .json({ type: "success", message: "Account created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ type: "error", message: "Internal server error" });
  }
});
module.exports = signup;
