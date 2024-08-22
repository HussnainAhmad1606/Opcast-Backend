const asyncWrapper = require("../../middleware/async");


const AudioEvent = require('../../models/AudioEvent');


const getPodcastEvents = asyncWrapper(async (req, res) => {
    if (req.method == "POST") {
        const {podcastId} = req.body;

    let events = await AudioEvent.find({podcastId: podcastId});
  
    return res.status(200).json({ type: "success", events:events});

        }
        else {
            return res.status(400).json({message: "Error occured while getting podcast statistics. Please try again.", type: "error"})
        }
})
module.exports = getPodcastEvents;