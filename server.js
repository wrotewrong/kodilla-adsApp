const express = require('express');
const mongoose = require('mongoose');
const adsRoutes = require('./routes/ads.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

app.use('/api/', adsRoutes);
app.use('/auth/', authRoutes);

app.listen(8000, () => {
  console.log('server is running on port 8000');
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

mongoose.connect('mongodb://localhost:27017/adsApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', () => {
  console.log('connected to the database');
});

db.on('error', (err) => {
  console.log('Error:' + err);
});
