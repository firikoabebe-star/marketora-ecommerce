import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import logger from './utils/logger';

const PORT = process.env.PORT || 5000;

let server: any;

const startServer = (port: number | string) => {
  // Only listen if NOT in Vercel or production environment
  if (!process.env.VERCEL && process.env.NODE_ENV !== 'production') {
    const currentPort = Number(port);
    server = app.listen(currentPort, () => {
      logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${currentPort}`);
    });

    server.on('error', (e: any) => {
      if (e.code === 'EADDRINUSE') {
        logger.warn(`Port ${currentPort} is busy, trying ${currentPort + 1}...`);
        startServer(currentPort + 1);
      } else {
        logger.error('Server error:', e);
      }
    });
  }
};

startServer(PORT);

export default app;

process.on('unhandledRejection', (err: Error) => {
  logger.error('UNHANDLED REJECTION! Shutting down...', err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  if (server) {
    server.close(() => {
      logger.info('Process terminated');
    });
  } else {
    logger.info('Process terminated');
  }
});
