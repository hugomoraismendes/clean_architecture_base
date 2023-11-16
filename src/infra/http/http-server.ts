import http from 'http';
import httpShutdown from 'http-shutdown';
import express from 'express';
import { AwilixContainer } from 'awilix';
import routes from './routes';
import { Config } from 'infra/config/config';

declare global {
  namespace Express {
    export interface Request {
      id: string;
      container: AwilixContainer;
    }
    export interface Response {
      reqStartedAt: number;
    }
  }
}

let server: http.Server = null;

export const startHttpServer = (config: Config, container: AwilixContainer): void => {
  if (server) {
    throw new Error('HTTP Server already started');
  }

  const app = express();

  app.disable('x-powered-by');
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  routes(app);

  server = httpShutdown(http.createServer(app));

  const KEEPALIVE_SECONDS = 65;
  server.keepAliveTimeout = KEEPALIVE_SECONDS * 1000;
  server.headersTimeout = (KEEPALIVE_SECONDS + 5) * 1000;

  server.listen(config.httpServer.port, () => {
    console.info(`HTTP server listening on port ${config.httpServer.port}`);
  });
};

export const shutdownHttpServer = async (): Promise<void> => {
  if (!server) {
    throw new Error('HTTP Server not started');
  }

  const s: any = server;

  return new Promise((resolve, reject) => {
    s.shutdown((err: Error) => {
      server = null;
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
