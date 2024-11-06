require('dotenv').config();

const express = require('express');
const apiRoutes = require('./routes/api');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

console.log({ PORT });

app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../client')));

app.use('/api', apiRoutes);

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
