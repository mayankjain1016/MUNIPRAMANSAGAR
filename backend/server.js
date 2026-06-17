import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
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
import sahityaRoutes from './routes/sahityaRoutes.js';
import pathshalaRoutes from './routes/pathshalaRoutes.js';
import santKiAdalatRoutes from './routes/santKiAdalatRoutes.js';
import biographyRoutes from './routes/biographyRoutes.js';
import discipleRoutes from './routes/discipleRoutes.js';
import featuredVideoRoutes from './routes/featuredVideoRoutes.js';
import liveVideoRoutes from './routes/liveVideoRoutes.js';

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://nirbhayvani.com', 'https://www.nirbhayvani.com']
    : ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

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
app.use('/api/sahitya', sahityaRoutes);
app.use('/api/pathshala', pathshalaRoutes);
app.use('/api/sant-ki-adalat', santKiAdalatRoutes);
app.use('/api/biography', biographyRoutes);
app.use('/api/disciples', discipleRoutes);
app.use('/api/featured-videos', featuredVideoRoutes);
app.use('/api/live-video', liveVideoRoutes);

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
