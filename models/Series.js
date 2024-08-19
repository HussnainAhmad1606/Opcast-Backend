const mongoose = require('mongoose');

const seriesSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "User of the series must be provided"],
 
    },
    name: {
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
    
  
})

module.exports = mongoose.model('Series', seriesSchema)