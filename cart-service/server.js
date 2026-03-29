require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

// Routes
app.use('/', require('./routes/cart'));

const PORT = process.env.PORT || 5001;
const DB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/cart_service';

console.log('Cart Service connecting to:', DB_URI);

mongoose.connect(DB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`${'cart-service'} running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error', err));
