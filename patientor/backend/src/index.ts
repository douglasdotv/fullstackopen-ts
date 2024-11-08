import express from 'express';

const app = express();

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  res.json({
    status: 'success',
    message: 'Pong! The API is up and running.',
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
