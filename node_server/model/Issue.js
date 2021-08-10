const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        min: 10,
        max: 50
    },
    decrpition: {
        type : String,
        required: true,
        max: 300,
        min: 10
    },
    raisedBy: {
        type : String,
    },
    type: {
        type : String,
    },
    category: {
        type : String,
    },
    subcategory: {
        type : String,
    },
    piority: {
        type : String,
    },
    assignee: {
        type : String,
    },
    lable: {
        type : String,
    },
    status: {
        type : String,
    },
    attachment: {
        type : Object,
    },
}, {
    collection: 'issues',
});


module.exports = mongoose.model('Issue', issueSchema);