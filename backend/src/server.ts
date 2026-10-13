import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma from './services/db.service';
import menuRoutes from './routes/menu.routes';
import orderRoutes from './routes/order.routes';
import trackingRoutes from './routes/tracking.routes';
import reservationRoutes from './routes/reservation.routes';
import conventionRoutes from './routes/convention.routes';
import whatsappRoutes from './routes/whatsapp.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable reverse proxy trust (for Nginx, AWS ALB, Render, Cloudflare)
app.set('trust proxy', 1);

// Parse allowed CORS origins from FRONTEND_URL or defaults
const configuredOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(',').map((url) => url.trim().replace(/\/$/, ''))
  : ['http://localhost:3000', 'http://127.0.0.1:3000'];

const isOriginAllowed = (origin: string | undefined): boolean => {
  if (!origin) return true; // Server-to-server, mobile or curl
  if (configuredOrigins.includes('*')) return true;
  if (configuredOrigins.includes(origin)) return true;
  if (origin === 'http://localhost:3000' || origin === 'http://127.0.0.1:3000') return true;
  if (origin.endsWith('.vercel.app')) return true;
  return false;
};

// Middlewares
app.use(
  cors({
    origin: (origin, callback) => {
      if (isOriginAllowed(origin)) {
        return callback(null, true);
      }
      return callback(null, false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

app.use(express.json());

// Production Security Headers
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Request logger
app.use((req: Request, _res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  }
  next();
});

// Production Health & Readiness check endpoints
const healthCheckHandler = async (_req: Request, res: Response) => {
  try {
    // Ping database to verify live connectivity
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      status: 'healthy',
      database: 'connected',
      service: 'Kritunga Palegar Backend API',
      version: '1.0.0',
      uptime: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    res.status(503).json({
      status: 'unhealthy',
      database: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
};

app.get('/health', healthCheckHandler);
app.get('/api/health', healthCheckHandler);

// API Routes
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/orders', trackingRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/conventions', conventionRoutes);
app.use('/api/whatsapp', whatsappRoutes);

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.url}`,
  });
});

// Global Error Handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal royal server error',
    error: process.env.NODE_ENV === 'production' ? undefined : err.message,
  });
});

const server = app.listen(PORT, () => {
  console.log(`[Kritunga API] Server running on http://localhost:${PORT}`);
  console.log(`[Kritunga API] Health check at http://localhost:${PORT}/api/health`);
});

// Graceful Shutdown Handler (SIGTERM, SIGINT)
const gracefulShutdown = async (signal: string) => {
  console.log(`[Kritunga API] ${signal} signal received. Initiating graceful shutdown...`);
  server.close(async () => {
    console.log('[Kritunga API] HTTP server closed.');
    try {
      await prisma.$disconnect();
      console.log('[Kritunga API] Database connections terminated.');
      process.exit(0);
    } catch (err) {
      console.error('[Kritunga API] Error disconnecting database:', err);
      process.exit(1);
    }
  });

  setTimeout(() => {
    console.error('[Kritunga API] Force shutdown after 10s timeout.');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

