import express from 'express';
import chalk from 'chalk';
import { icons, FeatherIcon } from 'feather-icons';
import path from 'path';
export const iconsView = express();
import { posthog } from '../../config/variables';
import { __dirname } from '../../helpers/directory';

iconsView.set('views', path.join(__dirname, 'views/template'));
iconsView.set('view engine', 'pug');

const iconList: {
  name: string;
  svg: string;
  color: string;
  size: number;
  url: string;
}[] = [];

for (const icon in icons) {
  const featherIcon: FeatherIcon = icons[icon as keyof typeof icons];
  iconList.push({
    name: icon,
    svg: `data:image/svg+xml;base64,${Buffer.from(featherIcon.toSvg()).toString(
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
      posthogPublicKey: posthog.publicKey,
    });
  } catch (e) {
    return console.log(chalk.red(e));
  }
});
