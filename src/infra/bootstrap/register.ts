import {
  createContainer,
  asValue,
  asClass,
  asFunction,
  AwilixContainer,
  InjectionMode,
  Lifetime
} from 'awilix';
import fs from 'fs';
import { randomUUID } from 'crypto';
import { DB, getModels, Config } from '@infra';
import { Utils, Constants } from '@shared';
import path from 'path';

export type AppContainer = {
  env: string;
  config: Config;
  fs: typeof fs;
  db: DB;
};

export const setupContainer = (config: Config): AwilixContainer => {
  const container = createContainer({
    injectionMode: InjectionMode.PROXY
  });

  const env = process.env.NODE_ENV || Constants.Env.Development;

  container.register({
    env: asValue(env),
    config: asValue(config),
    fs: asValue(fs),
    uuidv4: asValue(randomUUID),
    db: asFunction(getModels)
  });

  const baseDir = path.resolve(`${__dirname} + '/../..`);

  container.loadModules(
    [
      `${baseDir}/use-cases/**/*.interactor.js`,
      `${baseDir}/adapters/**/*.controller.js`,
      `${baseDir}/adapters/**/*.presenter.js`,
      `${baseDir}/adapters/**/*.gateway.js`,
      `${baseDir}/adapters/**/*.repository.js`,
      `${baseDir}/adapters/**/*.service.js`,
      `${baseDir}/infra/plugins/singleton/**/*.js`,
      `${baseDir}/infra/mappers/*.js`,
      `${baseDir}/shared/handlers/**/*.js`
    ],
    {
      formatName: (name) => {
        const infraLabelsRegex =
          /impl|jwt|http|x509|mysql|redis|express|sql|dynamo|sequelize|ssm/gi;

        let moduleName = name.replace(infraLabelsRegex, '');

        if (moduleName.startsWith('-')) {
          moduleName = moduleName.slice(1);
        }

        moduleName = moduleName.replace('.', '-');

        return Utils.snakeToCamel(moduleName).replace('-', '');
      },
      resolverOptions: {
        register: asClass,
        lifetime: Lifetime.SCOPED
      }
    }
  );

  return container;
};
