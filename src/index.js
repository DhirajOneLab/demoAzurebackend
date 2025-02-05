const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const jwtVerifyMiddleware = require('./verifyToken');

const app = express();

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
}));

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Protected API endpoint
app.get('/api/userinfo', jwtVerifyMiddleware, (req, res) => {
  res.json({ message: 'User info', user: req.user });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
