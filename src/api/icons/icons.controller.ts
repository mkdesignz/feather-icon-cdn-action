import { Request, Response } from 'express';
import { icons } from "feather-icons"


export class IconsController {
  constructor() {}

  public getAllIcons(_req: Request, res: Response): unknown {
    const allIcon = []
    for (const icon in icons) {
      allIcon.push({
        name: icon,
        icon: icons[icon].toSvg()
      });
    }
    return res.status(200).send(JSON.parse(JSON.stringify(allIcon)));
  }
  public getSingleIcon(req: Request, res: Response): unknown {
    const {
      color,
      size,
      fill,
      stroke_width
    } = req.query;
    const { iconsName } = req.params;
    try {
      const icon = icons[iconsName].toSvg({
        "color": color,
        "stroke-width": stroke_width || 2,
        "width": size || 24,
        "height": size || 24,
        "fill": fill || "transparent"
      });
      return res
        .header("Content-Type","image/svg+xml")
        .send(icon);
    } catch (e) {
      return res.status(404).send({
        message: "Icon Doesn't exist",
        status: 404
      });
    }
  }
}
