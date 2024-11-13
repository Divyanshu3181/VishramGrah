const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    maxcount: {
        type: Number,
        required: true
    },
    phonenumber: {
        type: Number,
        required: true
    },
    rentparday: {
        type: Number,
        required: true
    },
    imageurls: {
        type: [String],  // Array of strings for image URLs
        required: true
    },
    currentbookings: {
        type: [Object],  // Array of objects for bookings
        default: []
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const roomModel = mongoose.model('rooms', roomSchema);

module.exports = roomModel;
