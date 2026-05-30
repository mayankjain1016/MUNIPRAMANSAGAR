import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Import routes
import authRoutes from './routes/authRoutes.js';
import locationRoutes from './routes/locationRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import shankaSamadhanRoutes from './routes/shankaSamadhanRoutes.js';
import pravachanRoutes from './routes/pravachanRoutes.js';
import kahaniyaRoutes from './routes/kahaniyaRoutes.js';
import biographyRoutes from './routes/biographyRoutes.js';
import discipleRoutes from './routes/discipleRoutes.js';
import bookRoutes from './routes/bookRoutes.js';

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (uploads)
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/shanka-samadhan', shankaSamadhanRoutes);
app.use('/api/pravachan', pravachanRoutes);
app.use('/api/kahaniya', kahaniyaRoutes);
app.use('/api/biography', biographyRoutes);
app.use('/api/disciples', discipleRoutes);
app.use('/api/books', bookRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
