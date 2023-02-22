import { Schema, model } from 'mongoose';

const playerSchema = new Schema({
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

export default model('Player', playerSchema);