const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./src/routes');

const app = express();

// Configuring body parser middleware
app.use(bodyParser.json());
app.use(cors());


// Import routes
app.use('/estimator', routes);

// CONFIGURING CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Access-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.listen(5051, (req, res) => {
  res.send('server is runing');
});
