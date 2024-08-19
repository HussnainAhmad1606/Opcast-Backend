const asyncWrapper = require("../../middleware/async");

const Podcast = require('../../models/Podcast');


const getSinglePodcast = asyncWrapper(async (req, res) => {
    if (req.method == "POST") {
        const {username} = req.user;
        const {podcastId} = req.body;

    let podcast = await Podcast.findOne({_id: podcastId});
    console.log(username, podcastId)
    const isAdmin = podcast.username === username;
    return res.status(200).json({ type: "success", podcast:podcast, isAdmin:isAdmin});

        }
        else {
            return res.status(400).json({message: "Error occured while getting podcast. Please try again.", type: "error"})
        }
})
module.exports = getSinglePodcast;