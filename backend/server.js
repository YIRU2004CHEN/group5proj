const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', authRoutes);

mongoose.connect('mongodb://localhost:27017/Database')
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});