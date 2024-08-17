const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Product name must be provided"],
        unique: true 
    },
    email: {
        type: String,
        required: [true, "Email must be provided"],
        unique: true 
    },
    password: {
        type: String,
        required: [true, "Password must be provided"]
    },
    
  
})

module.exports = mongoose.model('User', userSchema)