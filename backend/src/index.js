require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');     // <- fixed path
const profileRoutes = require('./routes/profile');
const { authMiddleware } = require('./middleware/auth');

const app = express();
app.use(cors());
app.use(express.json());

// health check
app.get('/', (req, res) => res.json({ ok: true }));

// mount routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', authMiddleware, taskRoutes);
app.use('/api/profile', authMiddleware, profileRoutes);

const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mydb';

mongoose.connect(MONGO)
  .then(() => {
    console.log('Mongo connected');
    app.listen(PORT, () => console.log('Server on', PORT));
  })
  .catch(err => {
    console.error('Mongo connection error:', err.message || err);
    // start server anyway so frontend can be developed
    app.listen(PORT, () => console.log('Server on', PORT, '(DB not connected)'));
  });
