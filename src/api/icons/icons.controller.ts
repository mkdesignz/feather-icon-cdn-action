import { Request, Response } from 'express';
import { icons } from "feather-icons"


export class IconsController {
  constructor() {}

  public get(req: Request, res: Response): unknown {
    const { iconsName} = req.params;
    try {
      const icon = icons[iconsName].toSvg();
      return res
        .header("Content-Type","image/svg+xml")
        .send(icon);
    } catch (e) {
      return res.status(404).send({
        error: {
          message: "Icon Doesn't exist",
          status: 404
        }
      });
    }
  }
}
