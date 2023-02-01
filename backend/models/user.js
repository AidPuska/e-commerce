const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
    },
    googleId: {
        type: String,
    },
    password: {
        type: String
    },
    picture: {
        type: String
    }
})

module.exports = mongoose.model('eUser', userSchema)