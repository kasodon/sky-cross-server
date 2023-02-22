"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const playerSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    score: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Player details!'
    },
});
exports.default = mongoose_1.model('Player', playerSchema);
