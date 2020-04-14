const express = require('express');
const controller = require('./controller');

const router = express.Router();

// router.get('/sign-up', (req, res) => {
//   res.send('Going to get them');
// });

router.post('/on-covid-19/', controller.dataPost);
router.get('/on-covid-19/', controller.getData);

module.exports = router;
