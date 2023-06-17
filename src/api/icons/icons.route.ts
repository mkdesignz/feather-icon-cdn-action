import { Router } from 'express';
import { IconsController } from './icons.controller';
export const iconsRoute = Router();
const iconsController = new IconsController();

iconsRoute.get('/:iconsName', iconsController.get);
