const mongoose = require('mongoose');

const actionSchema = new mongoose.Schema({
    actionID:{
        type: String,
        required: true,
    },
    reffrence: {
        type : String,
        required: true,
    },
    actionPerformed: {
        type : String,
        required: true,
    },
    additionalInfo: {
        type: object
    }
});


module.exports = mongoose.model('Action', actionSchema);