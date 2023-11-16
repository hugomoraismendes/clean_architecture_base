process.env.TZ = 'UTC';
process.env.AWS_NODEJS_CONNECTION_REUSE_ENABLED = '1';

const moduleAlias = require('module-alias');
moduleAlias.addAlias('infra', __dirname + '/infra');
moduleAlias.addAlias('@infra', __dirname + '/infra');
moduleAlias.addAlias('@constants', __dirname + '/constants');
moduleAlias.addAlias('@adapters', __dirname + '/adapters');
moduleAlias.addAlias('@useCases', __dirname + '/use-cases');
moduleAlias.addAlias('@entities', __dirname + '/entities');
moduleAlias.addAlias('@shared', __dirname + '/shared');

import {
  getConfig,
  Bootstrap,
  startHttpServer,
  shutdownHttpServer,
  loadModels,
  unloadModels
} from '@infra';

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

async function init() {
  try {
    const config = await getConfig();

    await loadModels(config);

    const container = Bootstrap.setupContainer(config);

    startHttpServer(config, container);

    console.info('Bootstrapped', { nodeVersionStr: process.version });
  } catch (err: any) {
    console.error('Bootstrap error', { err });
    shutdown(1);
  }
}

async function shutdown(exitCode: number) {
  console.info('Shutting down');

  const stopHttpServer = async () => {
    try {
      await shutdownHttpServer();
      console.info('HTTP server closed');
    } catch (err: any) {
      console.error('HTTP server shutdown error', { err });
    }
  };

  // @ts-ignore
  await Promise.allSettled([stopHttpServer()]);

  try {
    unloadModels();
    console.info('Database connections closed');
  } catch (err: any) {
    console.error('Databases shutdown error', { err });
  }

  console.info('Bye');

  process.exit(exitCode);
}

init();
