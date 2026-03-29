require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(helmet());

// Routes
app.use('/', require('./routes/auth'));

app.get('/health', (req, res) => res.json({ status: 'auth-service OK' }));

const PORT = process.env.PORT || 5001;
const DB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/auth_service';

mongoose.connect(DB_URI)
  .then(() => {
    console.log('[auth-service] Connected to MongoDB');
    app.listen(PORT, () => console.log(`[auth-service] Running on port ${PORT}`));
  })
  .catch(err => console.error('[auth-service] MongoDB error:', err));
