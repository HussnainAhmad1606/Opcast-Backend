const asyncWrapper = require("../../middleware/async");

const Podcast = require("../../models/Podcast");
const addNewPodcast = asyncWrapper(async (req, res) => {
  if (req.method == "POST") {

    try {
        const {username} = req.user

        let newPodcast = new Podcast({
            username: username,
            title: req.body.title,
            description: req.body.description,
            cover: req.body.cover,
            host: req.body.host,
            category: req.body.category,
            series: req.body.series,
            guests: req.body.guests,
            audioURL: req.body.audioURL,
            duration: req.body.duration,
            isLive: req.body.isLive,
            status: req.body.status,
            publishDate: req.body.publishDate
        })
        await newPodcast.save();
            res.status(200).json({ type: "success", message: "New Podcast Created"});
    }
    catch(error) {
        res.status(400).json({ type: "error", message: "Error occured while adding new podcast. Please try again."});
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
module.exports = addNewPodcast;
