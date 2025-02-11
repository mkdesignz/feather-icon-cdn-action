import express from 'express';
import chalk from 'chalk';
import { icons } from 'feather-icons';
import path from 'path';
export const iconsView = express();
import { posthog } from '../../config/variables';

iconsView.set('views', path.join(__dirname, '../template/'));
iconsView.set('view engine', 'pug');

const iconList = [];
for (const icon in icons) {
  iconList.push({
    name: icon,
    svg: `data:image/svg+xml;base64,${Buffer.from(icons[icon].toSvg()).toString(
      'base64'
    )}`,
    color: '#000000',
    size: 24,
    url: `${
      process.env.CYCLIC_URL
        ? process.env.CYCLIC_URL
        : process.env.APP_URL
        ? process.env.APP_URL
        : ''
    }/api/icons/${icon}`,
  });
}

iconsView.get('/', (req, res) => {
  try {
    return res.render('icons', {
      title: 'All Icons',
      icons: iconList,
      posthog_public_key: posthog.public_key,
    });
  } catch (e) {
    return console.log(chalk.red(e.message));
  }
});
