import express from "express";
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import homeownerRoutes from './routes/homeownerRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';
import taxRoutes from './routes/taxRoutes.js';
import bodyParser from 'body-parser';
import cors from 'cors'; // Add this line


dotenv.config();

const app = express();

// CORS middleware
app.use(cors({
  origin: 'http://localhost:5173'
}));// Add this line

// This should be before any routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log('Request body:', req.body);
  next();
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/homeowners', homeownerRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/taxes', taxRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  // Connect to database
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});






