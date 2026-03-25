import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/api/health', (req, res) => {
  console.log('Health check local');
  res.json({
    status: 'ok',
    uptime: process.uptime(),
  });
});

const server = app.listen(port, () => {
  console.log(`Servidor rodando em ${port}`);
});

// graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Closing...');
  server.close(() => {
    console.log('Shutdown completed. Exiting.');
  });
});
