import {validationResult} from 'express-validator/check';
import Player from '../models/player';
import { ObjectId } from 'mongodb';

export const createScore = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error: any = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const name = req.body.name;
  const score = req.body.score;
  const player = new Player({
    name: name,
    score: score,
  });
  return player.save()
  .then(result => {
    res.status(201).json({
      message: 'Player details created successfully!',
      player: result
    });
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
};

export const getAllPlayers = (req: any, res: any, next: any) => {
  Player.find()
    .then(result => {
      if (!result) {
        const error: any = new Error('Could not fetch all players.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'All players fetched.', players: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

export const getScore = (req: any, res: any, next: any) => {
  const id = req.body.id;
  Player.findOne(id)
    .then(score => {
      if (!score) {
        const error: any = new Error('Could not find player score.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'Score fetched.', player: score });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

export const updateScore = (req: any, res: any, next: any) => {
  const id = req.body.id;
  Player.findOneAndUpdate({
    _id: id,
    }, {
      $set: req.body,
    }, {
      returnDocument: 'after',
    }
  )
    .then(result => {
      if (!result) {
        const error: any = new Error('Could not update player score.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'Player fetched.', player: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
