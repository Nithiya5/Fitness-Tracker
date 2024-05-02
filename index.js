const express = require('express');
const mongoose = require('mongoose');
const { Trainer, Trainee } = require('./schema');
const cors = require('cors');

const app = express();
const port = 3000;

mongoose.connect('mongodb+srv://nithiya_5:nithiya_2005@cluster0.a02jqzo.mongodb.net/fitness?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.use(express.json());
app.use(cors());


app.post('/trainer/signup', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
   
    const existingTrainer = await Trainer.findOne({ email });
    if (existingTrainer) {
      return res.status(400).json({ error: 'Trainer already exists' });
    }

    
    const newTrainer = new Trainer({
      email,
      password
    });

    await newTrainer.save();

    res.status(201).json({ message: 'Trainer signed up successfully' });
  } catch (error) {
    console.error('Error signing up trainer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
  
});


app.post('/trainee/signup', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const existingTrainee = await Trainee.findOne({ email });
    if (existingTrainee) {
      return res.status(400).json({ error: 'Trainee already exists' });
    }

    const newTrainee = new Trainee({
      email,
      password
    });

    await newTrainee.save();

    res.status(201).json({ message: 'Trainee signed up successfully' });
  } catch (error) {
    console.error('Error signing up trainee:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/trainer/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const trainer = await Trainer.findOne({ email });
    if (!trainer || trainer.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Trainer login successful' });
  } catch (error) {
    console.error('Error logging in trainer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/trainee/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const trainee = await Trainee.findOne({ email });
    if (!trainee || trainee.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

   
    res.status(200).json({ message: 'Trainee login successful' });
  } catch (error) {
    console.error('Error logging in trainee:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
