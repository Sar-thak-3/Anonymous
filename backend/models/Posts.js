const mongoose = require('mongoose')
const {Schema} = mongoose;

const PostSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String
    },
    tags: {
        type: Array
    },
    content: {
        type: String
    },
    img: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    username: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("posts" , PostSchema);