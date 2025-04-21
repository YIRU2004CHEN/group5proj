require('dotenv').config();  // ✅ Load env vars first
console.log('Loaded PORT from .env:', process.env.PORT);

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks'); // ✅ Import task routes
const connectDB = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Register routes
app.use('/api', authRoutes);
app.use('/api/tasks', taskRoutes); // ✅ This is the missing piece!

// ✅ Connect DB and start server
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  const server = app.listen(PORT, () => {
    const actualPort = server.address().port;
    console.log(`🚀 Server running on http://localhost:${actualPort}`);
  });
});
