require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { generalLimiter } = require('./middleware/rateLimiter');
const { errorHandler } = require('./middleware/errorHandler');
const enquiryRoutes = require('./routes/enquiry');

const app = express();

// 1. Security headers
app.use(helmet());

// 2. CORS setup
app.use(cors({ 
    origin: process.env.NODE_ENV === 'production' 
        ? (process.env.FRONTEND_URL || 'https://krishna-academy-upleta.vercel.app')
        : /^http:\/\/localhost:\d+$/
}));

// 3. Body parsers with limits
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false }));

// Global rate limiter
app.use(generalLimiter);

// Routes
// Health route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date()
  });
});

// Courses route (static JSON)
app.get('/api/courses', (req, res) => {
  const courses = [
    { id: 1, title: 'Std 5 to 8', description: 'Foundation batch for primary education.' },
    { id: 2, title: 'Std 9 & 10', description: 'Board exam preparation focusing on concepts.' },
    { id: 3, title: 'Std 11 & 12 Science', description: 'Advanced science and JEE/NEET basics.' },
    { id: 4, title: 'Std 11 & 12 Commerce', description: 'Comprehensive commerce and accounts.' }
  ];
  res.json({ success: true, count: courses.length, data: courses });
});

// Enquiry route
app.use('/api', enquiryRoutes);

// 4. Error Handler Middleware
app.use(errorHandler);

// Only listen in development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`[SERVER] Running on http://localhost:${PORT}`);
    });
}

module.exports = app;
