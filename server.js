const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');

require('dotenv').config();

const Users = require('./routes/Users');
const Assets = require('./routes/Assets');
const Bookings = require('./routes/Bookings');
const Tickets = require('./routes/Tickets');

const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

// Production parameters
if (process.env.NODE_ENV === 'production') {
  // Force SSL/HTTPS
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
      next();
    }
  });

  // Serve static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, 'client/build') });
  });
}

// Initialize connection once and create connection pool
mongoose
  .connect(
    process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then(() => console.log('Database Connected'))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());
require('./config/passport')(passport);

// Routes that should handle requests
app.use('/api/auth', Users);
app.use('/api/assets', Assets);
app.use('/api/bookings', Bookings);
app.use('/api/tickets', Tickets);

// Catch errors that go beyong the above routes
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// Pass direct errors
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
  next(error);
});

app.listen(port, () => {
  console.log(`Server is running on Port: ${port}`);
});
