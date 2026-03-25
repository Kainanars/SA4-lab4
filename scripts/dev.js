import express from 'express';

const app = express();
const port = process.env.PORT || 3000;
const appName = process.env.APP_NAME || 'lab4-service';

app.get('/api/health', (req, res) => {
  console.log(
    JSON.stringify({
      level: 'info',
      app: appName,
      event: 'health_check_local',
      method: req.method,
      path: req.path,
      timestamp: new Date().toISOString(),
    }),
  );

  res.json({
    status: 'ok',
    uptime: process.uptime(),
    app: appName,
    timestamp: new Date().toISOString(),
  });
});

const server = app.listen(port, () => {
  console.log(
    JSON.stringify({
      level: 'info',
      app: appName,
      event: 'server_started',
      port,
      timestamp: new Date().toISOString(),
    }),
  );
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(
      JSON.stringify({
        level: 'error',
        app: appName,
        event: 'startup_failed',
        reason: 'port_in_use',
        port,
        timestamp: new Date().toISOString(),
      }),
    );
    process.exit(1);
  }
});

function gracefulShutdown(signal) {
  console.log(
    JSON.stringify({
      level: 'info',
      app: appName,
      event: 'shutdown_started',
      signal,
      timestamp: new Date().toISOString(),
    }),
  );

  const forceExitTimer = setTimeout(() => {
    console.error(
      JSON.stringify({
        level: 'error',
        app: appName,
        event: 'shutdown_forced',
        signal,
        timeoutMs: 5000,
        timestamp: new Date().toISOString(),
      }),
    );
    process.exit(1);
  }, 5000);

  server.close(() => {
    clearTimeout(forceExitTimer);
    console.log(
      JSON.stringify({
        level: 'info',
        app: appName,
        event: 'shutdown_completed',
        signal,
        timestamp: new Date().toISOString(),
      }),
    );
    process.exit(0);
  });
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGBREAK', () => gracefulShutdown('SIGBREAK'));
