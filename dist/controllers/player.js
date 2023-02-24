"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateScore = exports.getScore = exports.getAllPlayers = exports.createScore = void 0;
const check_1 = require("express-validator/check");
const player_1 = __importDefault(require("../models/player"));
const createScore = (req, res, next) => {
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const name = req.body.name;
    const score = req.body.score;
    const player = new player_1.default({
        name: name,
        score: score,
    });
    return player.save()
        .then(result => {
        res.status(201).json(result);
    })
        .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};
exports.createScore = createScore;
const getAllPlayers = (req, res, next) => {
    player_1.default.find()
        .then(result => {
        if (!result) {
            const error = new Error('Could not fetch all players.');
            error.statusCode = 404;
            throw error;
        }
        result.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
        res.status(200).json(result);
    })
        .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};
exports.getAllPlayers = getAllPlayers;
const getScore = (req, res, next) => {
    const id = req.body.id;
    player_1.default.findOne({ _id: id })
        .then(score => {
        if (!score) {
            const error = new Error('Could not find player score.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json(score);
    })
        .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};
exports.getScore = getScore;
const updateScore = (req, res, next) => {
    const id = req.body.id;
    player_1.default.findOneAndUpdate({
        _id: id,
    }, {
        $set: req.body,
    }, {
        returnDocument: 'after',
    })
        .then(result => {
        if (!result) {
            const error = new Error('Could not update player score.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json(result);
    })
        .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};
exports.updateScore = updateScore;
