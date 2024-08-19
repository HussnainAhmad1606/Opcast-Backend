const asyncWrapper = require("../../middleware/async");

const Podcast = require('../../models/Podcast');

const getSeriesPodcasts = asyncWrapper(async (req, res) => {
    if (req.method == "POST") {
    const {seriesId} = req.body;
    let podcasts = await Podcast.find({series: seriesId});
        res.status(200).json({ type: "success", podcasts:podcasts});

        }
        else {
            return res.status(400).json({message: "Error occured while getting series. Please try again.", type: "error"})
        }
})
module.exports = getSeriesPodcasts;