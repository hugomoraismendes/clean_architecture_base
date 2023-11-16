import { Application } from 'express';
import executeRule from './execute-rule';

export default (app: Application) => {
  app.route('/parameter-store').post(executeRule('parameterStore'));
};
