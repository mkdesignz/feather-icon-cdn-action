import express from 'express';
import path from 'path';
import chalk from 'chalk';
import { posthog } from '../../config/variables';
import { __dirname } from '../../helpers/directory';

export const home = express();

home.set('views', path.join(__dirname, 'views/template'));
home.set('view engine', 'pug');
home.get('/', (req, res) => {
  try {
    return res.render('layout', {
      title: 'Lighthouse Images | Home',
      img: 'https://images.unsplash.com/photo-1504389557830-b293439b92d0',
      alt: '',
      posthogPublicKey: posthog.publicKey,
    });
  } catch (e) {
    return console.log(chalk.red(e));
  }
});
