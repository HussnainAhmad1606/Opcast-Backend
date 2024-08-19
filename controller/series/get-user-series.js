const asyncWrapper = require("../../middleware/async");

const Series = require('../../models/Series');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const getUserSeries = asyncWrapper(async (req, res) => {
    if (req.method == "POST") {
        const {username} = req.user;
        console.log(username)

    let series = await Series.find({username: username});
        res.status(200).json({ type: "success", series:series});

        }
        else {
            return res.status(400).json({message: "Error occured while getting series. Please try again.", type: "error"})
        }
})
module.exports = getUserSeries;