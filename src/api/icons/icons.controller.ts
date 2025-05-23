import { Application, Request, Response } from 'express';
import { FeatherIcon, icons } from 'feather-icons';

export class IconsController {
  constructor() {
  }

  public getAllIcons = (req: Request, res: Response): void => {
    console.log(req.headers['x-forwarded-for'], req.socket.remoteAddress);
    const allIcon = [];
    for (const icon in icons) {
      const featherIcon: FeatherIcon = icons[icon as keyof typeof icons];
      allIcon.push({
        name: featherIcon.name,
        icon: featherIcon.toSvg(),
      });
    }
    res.status(200).send(JSON.parse(JSON.stringify(allIcon))).end();
    return;
  }
  public getSingleIcon = (req: Request, res: Response): void => {
    const { color, size, fill, stroke_width } = req.query;
    const { iconsName } = req.params;

    if (!iconsName || !(iconsName in icons)) {
      res.status(404).send({
        message: "Icon doesn't exist",
        status: 404,
      }).end();
      return;
    }

    const parsedWidth = typeof size === 'string' ? parseInt(size, 10) : 24;
    const parsedHeight = typeof size === 'string' ? parseInt(size, 10) : 24;
    const parsedStroke = typeof stroke_width === 'string' ? parseInt(stroke_width, 10) : 2;
    const parsedFill = typeof fill === 'string' ? fill : 'transparent';
    const parsedColor = typeof color === 'string' ? color : undefined;

    try {
      const icon = icons[iconsName as keyof typeof icons].toSvg({
        color: parsedColor,
        'stroke-width': parsedStroke,
        width: parsedWidth,
        height: parsedHeight,
        fill: parsedFill,
      });

      res.header('Content-Type', 'image/svg+xml').send(icon).end();
    } catch (e: unknown) {
      console.error(e);
      res.status(500).send({
        message: 'Something went wrong',
        status: 500,
      }).end();
    }
  };
}
