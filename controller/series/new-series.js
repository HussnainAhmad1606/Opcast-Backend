const asyncWrapper = require("../../middleware/async");

const Series = require('../../models/Series');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const createNewSeries = asyncWrapper(async (req, res) => {
    if (req.method == "POST") {
        const { authorization } = req.headers;
      const token = authorization?.split(' ')[1];
    const decoded = jwt.decode(token);
    const { username } = decoded;

    let newSeries = new Series({
        username: username,
        name: req.body.name,
        description: req.body.description,
        cover: req.body.cover
    })
    await newSeries.save();
        res.status(200).json({ type: "success", message: "New Series Created"});

        }
        else {
            return res.status(400).json({message: "Error occured while creating new series. Please try again.", type: "error"})
        }
})
module.exports = createNewSeries;