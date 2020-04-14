/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./src/routes');

const app = express();

// CONFIGURING CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Access-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Configuring body parser middleware
app.use(bodyParser.json());
app.use(cors());

// Import routes
app.use('/api/v1/', routes);

// app.listen(5051, (req, res) => res.status(200).json('server is runing'));
const port = process.env.PORT || 5051;

app.listen(port, () => console.log(`Web App is live on port ${port}`));
