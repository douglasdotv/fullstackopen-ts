import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json({
    status: 'success',
    message: 'Pong! The API is up and running.',
    timestamp: new Date().toISOString(),
  });
});

export default router;
