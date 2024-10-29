import express from "express";
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import homeownerRoutes from './routes/homeownerRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';
import taxRoutes from './routes/taxRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();

// Update CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/homeowners', homeownerRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/taxes', taxRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!', error: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  // Connect to database
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});