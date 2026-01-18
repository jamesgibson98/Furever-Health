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
  origin: true, // Allow all origins in development (change for production)
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

// Initialize database and start server
const startServer = async () => {
  try {
    await createTables();
    console.log('Database initialized successfully');

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT} and accessible from all interfaces`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
