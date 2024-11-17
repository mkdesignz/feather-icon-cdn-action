import express from 'express';
import { Server } from './variables';
import { development } from './enviornment/dev';
import { production } from './enviornment/prod';
import helmet from 'helmet';

export const environment = express();
environment.use(
  helmet({
    hidePoweredBy: true,
    noSniff: true,
    crossOriginResourcePolicy: false, // todo: make an actual policy
  })
);
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
