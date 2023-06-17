import { Request, Response } from 'express';
import { icons } from "feather-icons"


export class IconsController {
  constructor() {}

  public get(req: Request, res: Response): unknown {
    const { iconName} = req.params;

    try {
      const icon = icons[iconName].toSvg();
      console.log(icon)
      return res
        .header("Content-Type","image/svg+xml")
        .send(icon);
    } catch (e) {
      return res.status(404);
    }
  }
}
