import express from 'express';
import { body } from 'express-validator/check';

import * as playerController from '../controllers/player';

const router = express.Router();

// POST /player/post
router.post(
  '/player',
  [
    body('name')
      .trim(),
      body('score')
      .trim()
  ],
  playerController.createScore
);

// PATCH /player/post
router.patch(
  '/player',
  [
    body('name')
      .trim(),
      body('score')
      .trim()
  ],
  playerController.updateScore
);

// Player Score
router.post('/score', playerController.getScore)

// All Player Scores
router.get('/player', playerController.getAllPlayers)


export default router;