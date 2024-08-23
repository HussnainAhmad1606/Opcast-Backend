const asyncWrapper = require("../../middleware/async");

const Podcast = require('../../models/Podcast');


const increaseEarnings = asyncWrapper(async (req, res) => {
    if (req.method == "POST") {
        const {username} = req.user;
        const {podcastId, earnings} = req.body;
        console.log(podcastId, earnings);

        let podcast = await Podcast.findById(podcastId);
        podcast.earnings += 0.1;
        await podcast.save();
    return res.status(200).json({ type: "success", message: "Earnings updated successfully"});
   
        }
        else {
            return res.status(400).json({message: "Error occured while getting podcast. Please try again.", type: "error"})
        }
})
module.exports = increaseEarnings;