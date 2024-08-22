const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const eventsSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "User of the event must be provided"],
    },
   podcastId: {
        type: Schema.Types.ObjectId,
    ref: 'Podcast'
    },
    eventType: {
        type: String,
        required: [true, "Event Type must be provided"],
    },
    ipAddress: {
        type: String,
        required: [true, "IP Address must be provided"],
    },
    deviceInfo: {
        deviceType: {
          type: String,
          required: true
        },
        browser: {
          type: String,
          required: true
        }
      }
    
  
})

module.exports = mongoose.model('AudioEvent', eventsSchema)