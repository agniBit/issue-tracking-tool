const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    commentBy:{
        type: String,
        required: true,
    },
    comment: {
        type : String,
        required: true,
        max: 300,
    },
    reffrence: {
        type : String,
        required: true,
    },
    attachment: {
        type: object
    }
});


module.exports = mongoose.model('Comment', commentSchema);