import express from 'express';
import { notFound } from '../views/errors/404';
import { iconsRoute } from './icons/icons.route';

export const api = express();

api.use('/icons', iconsRoute);
