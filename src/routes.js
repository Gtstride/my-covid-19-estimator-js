import express from 'express';

import controller from './controller';

const router = express.Router();

router.post('/post-data', controller.dataPost);
router.get('/get-data', controller.getData);
