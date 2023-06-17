import express from 'express';
import { Server } from './variables';
import { development } from './enviornment/dev';
import { production } from './enviornment/prod';
import { init } from './enviornment/init';
import helmet from 'helmet';

export const environment = express();
environment.use(helmet({
  contentSecurityPolicy: false
}));
switch (Server.environment) {
  case 'Development':
  case 'development':
    environment.use(development);
    break;
  case 'Init':
  case 'init':
    environment.use('/init', init);
    break;
  case 'Production':
  case 'production':
    environment.use(production);
    break;
}
