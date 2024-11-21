import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import homeownerRoutes from './routes/homeownerRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';
import activityRoutes from './routes/activityRoutes.js';
import taxRoutes from './routes/taxRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', process.env.FRONTEND_URL],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Health check endpoint - move before other middleware
app.get('/health', (_, res) => {
  try {
    // Check MongoDB connection
    if (mongoose.connection.readyState === 1) {
      res.status(200).json({ 
        status: 'ok',
        database: 'connected',
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(503).json({ 
        status: 'error',
        database: 'disconnected',
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    res.status(500).json({ 
      status: 'error',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Important: Raw body parsing for Stripe webhooks must come before express.json()
app.use('/api/payments/webhook', express.raw({ type: 'application/json' }));

// Regular body parsing for other routes
app.use(express.json());

// Add error handling for MongoDB connection
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Add unhandled promise rejection handling
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/homeowners', homeownerRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/taxes', taxRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reports', reportRoutes);

const PORT = process.env.PORT || 5000;

// Improve server startup
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle server errors
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
  } else {
    console.error('Server error:', error);
  }
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
});