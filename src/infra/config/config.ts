import { readFileSync } from 'fs';
import { Options } from 'sequelize';
import { Constants } from '../../shared';

const env = process.env.NODE_ENV || Constants.Env.Development;

export type Config = {
  readonly env: string;
  readonly httpServer: {
    readonly port: number;
  };
  readonly databases: {
    readonly mysql: {
      readonly [key: string]: Options;
    };
  };
};

const appPackage = JSON.parse(readFileSync('package.json').toString('utf-8'));

const buildParamName = (param: string): string => {
  return `/${env}/${appPackage.name}/${param}`;
};

const PARAMETER_CONFIG = buildParamName('config');
const PARAMETER_DATABASES = buildParamName('databases');
const PARAMETER_TIMEZONE = `/${env}/common/timezone`;

const getParameters = async (): Promise<{ [key: string]: string }> => {
  if (env === Constants.Env.Development) {
    return {
      [PARAMETER_CONFIG]: readFileSync(`${__dirname}/config.json`).toString(),
      [PARAMETER_DATABASES]: readFileSync(`${__dirname}/databases.json`).toString(),
      [PARAMETER_TIMEZONE]: 'America/Fortaleza'
    };
  }

  // const options = {
  //   Names: [PARAMETER_CONFIG, PARAMETER_DATABASES, PARAMETER_TIMEZONE],
  //   WithDecryption: true
  // };

  //buscar no banco
  // const response = await ssm.getParameters(options);
  // let params: { [key: string]: string } = {};

  // response.Parameters.forEach((p) => {
  //   params[p.Name] = p.Value;
  // });

  // return params;
  return {};
};

export const getConfig = async (): Promise<Config> => {
  const params = await getParameters();
  const config = JSON.parse(params[PARAMETER_CONFIG]);
  const databases = JSON.parse(params[PARAMETER_DATABASES]);

  config.timezone = params[PARAMETER_TIMEZONE];
  config.databases = databases;
  config.env = env;

  return config;
};
