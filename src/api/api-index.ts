import express from 'express';
import { iconsRoute } from './icons/icons.route';

export const api = express();

api.use('/icons', iconsRoute);
