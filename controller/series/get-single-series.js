const asyncWrapper = require("../../middleware/async");

const Series = require('../../models/Series');


const getUserSeries = asyncWrapper(async (req, res) => {
    if (req.method == "POST") {
        const {username} = req.user;
        const {seriesId} = req.body;

    let series = await Series.findOne({_id: seriesId});
    console.log(series, seriesId)
    const isAdmin = series.username === username;
    return res.status(200).json({ type: "success", series:series, isAdmin:isAdmin});

        }
        else {
            return res.status(400).json({message: "Error occured while getting series. Please try again.", type: "error"})
        }
})
module.exports = getUserSeries;