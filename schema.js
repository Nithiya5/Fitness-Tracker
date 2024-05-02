// models.js
const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  // Add any other fields specific to Trainer model
});

const traineeSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  // Add any other fields specific to Trainee model
});

const Trainer = mongoose.model('Trainer', trainerSchema);
const Trainee = mongoose.model('Trainee', traineeSchema);

module.exports = { Trainer, Trainee };
