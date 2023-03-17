const express = require('express');
// const formidableMiddleware = require('express-formidable');
const path = require('path');
// const uniqid = require('uniqid');
const mongoose = require('mongoose');
const adsRoutes = require('./routes/ads.routes');
const usersRoutes = require('./routes/users.routes');
const authRoutes = require('./routes/auth.routes');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
require('dotenv').config();

const app = express();

//FORMIDABLE MIDDLEWARE
// app.use(
//   formidableMiddleware({ uploadDir: './public/uploads/' }, [
//     {
//       event: 'fileBegin',
//       action: (req, res, next, name, file) => {
//         const fileName = uniqid() + '.' + file.name.split('.')[1];
//         file.path = __dirname + '/public/uploads/photo_' + fileName;
//       },
//     },
//   ])
// );

app.use(express.json());
app.use(express.urlencoded({ extends: false }));

if (process.env.NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: ['http://localhost:3000'],
      credentials: true,
    })
  );
}

let dbUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@kodilla-adsapp.kqzdw7r.mongodb.net/adsApp?retryWrites=true&w=majority`;

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      secure: process.env.NODE_ENV == 'production',
    },
    store: MongoStore.create({ mongoUrl: dbUri }),
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/public')));

app.use('/api/', adsRoutes);
app.use('/api/', usersRoutes);
app.use('/auth/', authRoutes);

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running...');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

mongoose.connect(dbUri, {
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
