const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());

app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://plx-hiring-api.fly.dev/api',
    changeOrigin: true,
    pathRewrite: {
      [`^/api`]: '',
    },
    headers: {
      'X-Api-Key': process.env.API_KEY,
      'Content-Type': 'application/json',
    },
  })
);

app.listen(3001);
