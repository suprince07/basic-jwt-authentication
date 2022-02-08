const express = require('express');
const app = express();

// Define middlewares
app.use(express.json());

// Initialize routes
app.use(require('../route/main.route'))

module.exports = app;