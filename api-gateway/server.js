require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');
const rateLimiter = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/error');
const authMiddleware = require('./middleware/auth');

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(rateLimiter);

// Service Routes Mapping
const SERVICES = {
  auth: process.env.AUTH_SERVICE_URL || 'http://localhost:5001',
  users: process.env.USER_SERVICE_URL || 'http://localhost:5002',
  products: process.env.PRODUCT_SERVICE_URL || 'http://localhost:5003',
  cart: process.env.CART_SERVICE_URL || 'http://localhost:5004',
  orders: process.env.ORDER_SERVICE_URL || 'http://localhost:5009'
};

// Route Configuration
const routes = [
  {
    path: '/api/v1/auth',
    target: SERVICES.auth,
    authRequired: false
  },
  {
    path: '/api/v1/users',
    target: SERVICES.users,
    authRequired: true
  },
  {
    path: '/api/v1/products',
    target: SERVICES.products,
    authRequired: false // Get products public, modifications handle auth in product-service
  },
  {
    path: '/api/v1/cart',
    target: SERVICES.cart,
    authRequired: false // Cart service handles its own auth
  },
  {
    path: '/api/v1/orders',
    target: SERVICES.orders,
    authRequired: true
  }
];

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'API Gateway is running' });
});

// Apply Proxy Middleware
routes.forEach(route => {
  const proxyOptions = {
    target: route.target,
    changeOrigin: true,
    pathRewrite: {
      ['^' + route.path]: ''
    }
  };

  const middleware = [route.authRequired ? authMiddleware : null].filter(Boolean);

  app.use(route.path, middleware, createProxyMiddleware(proxyOptions));
});

// Central Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API Gateway started on port ${PORT}`);
});
