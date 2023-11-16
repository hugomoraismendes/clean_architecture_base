import { Application } from 'express';
import parameterStoreApi from './parameterStore';

export default (app: Application) => {
  app.route('/').get((req, res) => {
    res.send('hola mundo');
  });
  parameterStoreApi(app);
};
