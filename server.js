const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3002;

// Configure Express limits
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ 
  extended: true, 
  limit: '50mb',
  parameterLimit: 50000 
}));

// Configure CORS with specific options
const corsOptions = {
  origin: 'http://localhost:3002',
  methods: ['GET', 'POST'],
  allowedHeaders: [
    'Content-Type',
    'x-api-key',
    'Accept'
  ],
  maxAge: 3600
};

app.use(cors(corsOptions));

// Debug middleware
app.use((req, res, next) => {
  // Set custom headers to handle large requests
  res.header('Connection', 'Keep-Alive');
  res.header('Keep-Alive', 'timeout=5, max=1000');
  next();
});

// Routes
const quantumRoute = require('./routes/quantum');
app.use('/api', quantumRoute);

// Error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ 
    error: err.message,
    type: err.name,
    path: req.path
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log('Environment variables loaded:', {
    API_URL: process.env.QUANTUM_API_URL ? 'Set' : 'Not set',
    API_KEY: process.env.QUANTUM_API_KEY ? 'Set' : 'Not set'
  });
}); 