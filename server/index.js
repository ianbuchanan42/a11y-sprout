require('dotenv').config();

const express = require('express');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
const app = express();
const path = require('path');
const cors = require('cors');
const passport = require('./config/passport');
const PORT = process.env.PORT || 3000;

console.log({ PORT });

app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: 'http://localhost:8080', // Allow frontend origin
    credentials: true, // Allow cookies and credentials
  })
);

// Express session setup
app.use(
  session({
    secret: 'secret12', // Replace with a secure secret in production
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);

app.use('/api', apiRoutes);

// app.use('/dashboard', (req, res) => {
//   if (req.isAuthenticated()) {
//     return res.status(200).json({ loggedIn: true, user: req.user });
//   }
//   return res.status(401).json({ message: 'Unauthorized' });
// });

// Server static files in production
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('../client/dist'));
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
//   });
// }
app.use(express.static(path.resolve(__dirname, '../client')));

app.use(express.static(path.join(__dirname, 'public')));

app.use((err, req, res, next) => {
  console.log(err);
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
