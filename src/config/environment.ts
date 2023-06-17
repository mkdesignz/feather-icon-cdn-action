import express from 'express';
import { Server } from './variables';
import { development } from './enviornment/dev';
import { production } from './enviornment/prod';
import helmet from 'helmet';

export const environment = express();
environment.use(helmet({
  contentSecurityPolicy: false,
  hsts: true,
  hidePoweredBy: true,
  noSniff: true
}));
switch (Server.environment) {
  case 'Development':
  case 'development':
    environment.use(development);
    break;
  case 'Production':
  case 'production':
    environment.use(production);
    break;
}
