export default function handler(req, res) {
  const appName = process.env.APP_NAME || 'lab4-service';

  console.log(
    JSON.stringify({
      level: 'info',
      app: appName,
      event: 'health_check_serverless',
      method: req.method,
      path: req.url,
      timestamp: new Date().toISOString(),
    }),
  );

  res.status(200).json({
    status: 'ok',
    app: appName,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
}
