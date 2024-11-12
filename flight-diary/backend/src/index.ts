import express from 'express';
import diaryRouter from './routes/diaries';

const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/api/ping', (_req, res) => {
  res.json({
    status: 'success',
    message: 'Pong! The API is up and running.',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/diaries', diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
