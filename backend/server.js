const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const { createTables } = require('./config/initDb');
const authRoutes = require('./routes/auth');
const petsRoutes = require('./routes/pets');
const healthRoutes = require('./routes/health');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://frontend-nine-flame-16.vercel.app'
  ],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/pets', petsRoutes);
app.use('/api/health', healthRoutes);

// Health check
app.get('/api/health-check', (req, res) => {
  res.json({ status: 'OK', message: 'Furever Health API is running' });
});

// Initialize database
const initDatabase = async () => {
  try {
    await createTables();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
  }
};

// For local development
if (process.env.NODE_ENV !== 'production') {
  const startServer = async () => {
    await initDatabase();
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT} and accessible from all interfaces`);
    });
  };
  startServer();
} else {
  // For Vercel serverless
  initDatabase();
}

// Export for Vercel
module.exports = app;
