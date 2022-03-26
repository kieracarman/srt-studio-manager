import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import morgan from 'morgan';
import path from 'path';
import passport from 'passport';

import 'dotenv/config';
import userRoutes from './routes/Users.js';
import assetRoutes from './routes/Assets.js';
import passportConfig from './config/passport.js';

const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(morgan('tiny'));
app.use(cors());
app.use(passport.initialize());
passportConfig(passport);

// If we're on production, force TLS and serve static files
if (process.env.NODE_ENV === 'production') {
  // Force TLS/HTTPS
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

// Routes that should handle requests
app.use('/api/auth', userRoutes);
app.use('/api/assets', assetRoutes);

// Initialize connection once and create connection pool
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database Connected'))
  .catch((err) => console.log(err));

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