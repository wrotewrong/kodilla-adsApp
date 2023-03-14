const express = require('express');
const formidableMiddleware = require('express-formidable');
const path = require('path');
const uniqid = require('uniqid');
const mongoose = require('mongoose');
const adsRoutes = require('./routes/ads.routes');
const usersRoutes = require('./routes/users.routes');
const authRoutes = require('./routes/auth.routes');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();
app.use(
  formidableMiddleware({ uploadDir: './public/uploads/' }, [
    {
      event: 'fileBegin',
      action: (req, res, next, name, file) => {
        const fileName = uniqid() + '.' + file.name.split('.')[1];
        file.path = __dirname + '/public/uploads/photo_' + fileName;
      },
    },
  ])
);

app.use(express.json());
app.use(
  session({
    secret: 'shi82la(sd@',
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/adsApp' }),
    resave: false,
    saveUninitialized: false,
  })
);

app.use('/api/', adsRoutes);
app.use('/api/', usersRoutes);
app.use('/auth/', authRoutes);

app.listen(8000, () => {
  console.log('server is running on port 8000');
});

app.use(express.static(path.join(__dirname, '/public')));

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
