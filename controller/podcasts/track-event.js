const asyncWrapper = require("../../middleware/async");
const AudioEvent = require("../../models/AudioEvent");

const trackEvent = asyncWrapper(async (req, res) => {
  if (req.method == "POST") {

    try {
        const {username} = req.user

        let newEvent = new AudioEvent({
            username: username,
            podcastId: req.body.podcastId,
            eventType: req.body.eventType,
            ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            deviceInfo: req.body.deviceInfo
        })
        await newEvent.save();
            res.status(200).json({ type: "success", message: "Event Tracked"});
    }
    catch(error) {
      console.log(error)
        res.status(400).json({ type: "error", message: "Error occured while adding new event. Please try again."});
    }
  } else {
    return res
      .status(400)
      .json({
        message: "Method not Allowed",
        type: "error",
      });
  }
});
module.exports = trackEvent;
