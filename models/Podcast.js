const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-double')(mongoose);
const SchemaTypes = mongoose.Schema.Types;
const podcastSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "User of the series must be provided"],
 
    },
    title: {
        type: String,
        required: [true, "Series Name must be provided"],

    },
    description: {
        type: String,
        required: [true, "Series Description must be provided"]
    },
    cover: {
        type: String
    },
    host: {
        type: String,
        required: [true, "Host of podcast must be provided"]
    },
    category: [{
        type: String,
        required: [true, "Podcast category must be provided"]

      }],
    series: {
        type: Schema.Types.ObjectId,
    ref: 'Series'
    },
    guest: [{
        type: String,
        required: [true, "Podcast Guests must be provided"]

      }],
    audioURL: {
        type: String
    },
    duration: {
        type: String
    },
    isLive: {
        type: Boolean
    },
    status: {
        type: String,
        enum: ['Published', 'Draft', 'Scheduled'],
    },
    publishDate: {
        type: Date,
        required: [true, "Podcast Date must be provided"]
    },
    earnings: {
        type: SchemaTypes.Double,
        default: 0.0
    }
  
})

module.exports = mongoose.model('Podcast', podcastSchema)