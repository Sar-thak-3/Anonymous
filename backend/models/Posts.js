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
        Data: Buffer,
        ContentType: String,
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("posts" , PostSchema);