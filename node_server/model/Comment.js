const { string } = require('joi');
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    issueId : {
        type : String,
    },
    comments: [
        {
            commentedBy:{
                type: Object,
                username: {
                    type: String,
                    required: true,
                },
                userInfo: {
                    profileLink :{
                        type: String, 
                    },
                    role: {
                        type: String
                    }
                }
            },
            id: {
                type: String,
            },
            comment: {
                type : String,
                required: true,
                max: 1000,
                min: 1,
            },
            reffrence: {
                type : String,
                required: true,
            },
            datetime: {
                type: String
            },
            attachment: {
                type: Object,
            }
        }
    ]
});


module.exports = mongoose.model('Comment', commentSchema);