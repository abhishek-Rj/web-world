import { Router, Response, Request } from "express";

export const userRouter = Router();

userRouter.post("/register", (req: Request, res: Response) => {
  res.json({
    msg: "SUCCESS",
  });
});

export default userRouter;
