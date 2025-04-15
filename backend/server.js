const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const connectDB = require('./db');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);

connectDB().then(() => {
  const PORT = process.env.PORT || 0; // 0 means the OS will assign a random available port
  
  // ✅ Define server before using it in the callback
  const server = app.listen(PORT, () => {
    const actualPort = server.address().port; // This gets the real assigned port
    console.log(`🚀 Server running on http://localhost:${actualPort}`);
  });
});
