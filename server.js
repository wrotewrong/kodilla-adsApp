const express = require('express');
const adsRoutes = require('./routes/ads.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

app.use('/api/', adsRoutes);
app.use('/auth/', authRoutes);

app.listen(8000, () => {
  console.log('server is running on port 8000');
});
