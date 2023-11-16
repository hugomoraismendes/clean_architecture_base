import SequelizeLib from 'sequelize';
import { Config } from '@infra';
import { ParameterStoreModel } from './models/parameter-store';
import { ModelCtor, SequelizeOptions, Sequelize } from 'sequelize-typescript';

const modelsMap = new Map<string, ModelCtor[]>();
modelsMap.set('main', [ParameterStoreModel]);

export type DB = {
  Sequelize: typeof SequelizeLib;
  connections: {
    [k: string]: Sequelize;
  };
  models: typeof modelsMap;
};

let db: DB = null;

export const loadModels = async (config: Config): Promise<DB> => {
  if (db) {
    throw new Error('DB models already loaded');
  }

  const databases = config.databases;

  const dbObj: any = {
    Sequelize: SequelizeLib,
    connections: {},
    models: {}
  };

  const connPromises = Object.keys(databases.mysql).map((key) => {
    if (databases.mysql[key].dialect !== 'mysql' || key.endsWith('_mig')) {
      return;
    }

    const defaultDbAttributes = {
      logging: (query: string) => console.trace('Sequelize query', { database: key, query: query }),
      timezone: '+00:00',
      define: {
        underscored: true
      },
      dialectOptions: {
        timezone: '+00:00'
      },
      retry: {
        max: 3
      },
      isolationLevel: SequelizeLib.Transaction.ISOLATION_LEVELS.READ_COMMITTED,
      bindParam: false
    };

    const dbOptions: SequelizeOptions = {
      ...databases.mysql[key],
      ...defaultDbAttributes,
      models: modelsMap.get(key)
    };

    const connection = new Sequelize(dbOptions);

    dbObj.connections[key] = connection;

    return connection.authenticate();
  });

  await Promise.all(connPromises);

  db = dbObj;

  return dbObj;
};

export const getModels = () => {
  return db;
};

export const unloadModels = async (): Promise<void> => {
  if (!db) {
    throw new Error('DB models are not loaded');
  }

  // @ts-ignore
  await Promise.allSettled(
    Object.keys(db.connections).map(async (key) => {
      return db.connections[key].close();
    })
  );

  db = null;
};
