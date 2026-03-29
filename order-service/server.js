require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

// Routes
app.use('/api/v1/orders', require('./routes/orders'));

const PORT = process.env.PORT || 5009;
const DB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/order_service';

mongoose.connect(DB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`${'order-service'} running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error', err));
