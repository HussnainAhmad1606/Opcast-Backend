const asyncWrapper = require("../../middleware/async");

const Podcast = require('../../models/Podcast');


const getTotalEarnings = asyncWrapper(async (req, res) => {
    if (req.method == "POST") {
        const {username} = req.user;
        let podcasts = await Podcast.find({ username: username });

    // Sum the earnings
    const totalEarnings = podcasts.reduce((total, podcast) => total + (podcast.earnings || 0), 0);

    return res.status(200).json({ type: "success", totalEarnings: totalEarnings});
        }
        else {
            return res.status(400).json({message: "Error occured while getting podcast. Please try again.", type: "error"})
        }
})
module.exports = getTotalEarnings;