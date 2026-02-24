import { randomCode } from "../../random.code.generator";
import { Request, Response } from "express";

function join(req: Request, res: Response) {
  try {
    const code = randomCode();
    if (code) {
      res.status(200).json({
        code,
      });
    } else {
      res.status(300).json({
        prb: "Coudnt generate code",
      });
    }
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
}

export { join };
